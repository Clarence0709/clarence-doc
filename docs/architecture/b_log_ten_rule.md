# 打印日志最佳实践

> 参考链接： [打印优质日志的 10 条军规-苏三说技术](https://mp.weixin.qq.com/s/Jz3eC3p6tfE3QUPOkw4sTQ)

## 第1条：格式统一

### 反例（管理看到会扣钱）

```
log.info("start process");
log.error("error happen");
```

无时间戳，无上下文。

### 正解代码：

```xml
<!-- logback.xml核心配置 -->
<pattern>
    %d{yy-MM-dd HH:mm:ss.SSS}
    |%X{traceId:-NO_ID}
    |%thread
    |%-5level
    |%logger{36}
    |%msg%n
</pattern>
```

在logback.xml中统一配置了日志的时间格式、tradeId，线程、等级、日志详情都信息。

日志的格式统一了，更方便点位问题。

![img.png](../assets/architecture/format.png)

## 第2条：异常必带堆栈

### 反例（同事看了想打人）：

```
try {
    processOrder();
} catch (Exception e) {
    log.error("处理失败");
}
```

出现异常了，日志中没打印任何的异常堆栈信息。

相当于自己把异常吃掉了。 非常不好排查问题。

### 正确姿势：

```java
// e必须存在！
log.error("订单处理异常 orderId={}",orderId, e);
```

日志中记录了出现异常的订单号orderId和异常的堆栈信息e。

## 第3条：级别合理

### 反面教材：

```
// 业务异常应属WARN
log.debug("用户余额不足 userId={}", userId); 
// 普通超时属INFO
log.error("接口响应稍慢");
```

接口响应稍慢，打印了error级别的日志，显然不太合理。

正常情况下，普通超时属INFO级别。

### 日志级别定义表

| 级别    | 正确使用场景                 |
|-------|------------------------|
| FATAL | 系统即将崩溃（如 OOM、磁盘爆满）     |
| ERROR | 核心业务失败（如支付失败、订单创建异常）   |
| WARN  | 可恢复异常（如重试成功、触发降级）      |
| INFO  | 关键流程节点（如订单状态变更、接口响应稍慢） |
| DEBUG | 调试信息（如参数流水、中间结果）       |

## 第4条：参数完整

### 反例（让运维骂娘）：

```java
log.info("用户登录失败");
```

上面这个日志只打印了“用户登录失败”这个文案。

谁在哪登录失败？

### 侦探式日志：

```java
log.warn("用户登录失败 username={}, clientIP={}, failReason={}",
         username, clientIP, "密码错误次数超限");
```

登录失败的业务场景，需要记录哪个用户，ip是多少，在什么时间，登录失败了，失败的原因是什么。

时间在logback.xml中统一配置了格式。

这样才方便快速定位问题：

![img.png](../assets/architecture/full_param.png)

## 第5条：数据脱敏

### 血泪案例：

某同事打印日志泄露用户手机号被投诉。

我在记录的日志中，需要对一下用户的个人敏感数据做脱敏处理。

例如下面这样：

```
// 脱敏工具类
public class LogMasker {
    public static String maskMobile(String mobile) {
        return mobile.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
    }
}

// 使用示例
log.info("用户注册 mobile={}", LogMasker.maskMobile("13812345678"));
```

## 第6条：异步保性能

### 问题复现

某次秒杀活动中直接同步写日志，导致大量线程阻塞：

```java
log.info("秒杀请求 userId={}, itemId={}",userId, itemId);
```

高并发下IO阻塞。

### 致命伤害分析：

- 同步写日志导致线程上下文切换频繁
- 磁盘IO成为系统瓶颈
- 高峰期日志打印耗时占总RT的25%

### 正确示范（三步配置法）

#### 步骤1：logback.xml配置异步通道

```xml
<!-- 异步Appender核心配置 -->
<appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
    <!-- 不丢失日志的阈值：当队列剩余容量＜此值时，TRACE/DEBUG级别日志将被丢弃 -->
    <discardingThreshold>0</discardingThreshold>
    <!-- 队列深度：建议设为 (最大并发线程数 × 2) -->
    <queueSize>4096</queueSize>
    <!-- 关联真实Appender -->
    <appender-ref ref="FILE"/>
</appender> 
``` 

#### 步骤2：日志输出优化代码

```
// 无需前置判断，框架自动处理  
// 自动异步写入队列
log.debug("接收到MQ消息：{}", msg.toSimpleString());

// 不应做复杂计算后再打印（异步前仍在业务线程执行）  
// 错误做法：  
log.debug("详细内容：{}", computeExpensiveLog());
```

流程图如下：
![img.png](../assets/architecture/log_output.png)

#### 步骤3：性能关键参数公式

```
最大内存占用 ≈ 队列长度 × 平均单条日志大小  
推荐队列深度 = 峰值TPS × 容忍最大延迟(秒)  
例如：10000 TPS × 0.5s容忍 ⇒ 5000队列大小 
``` 

### 风险规避策略

- 防队列堆积：监控队列使用率，达80%触发告警
- 防OOM：严格约束大对象toString()的调用
- 紧急逃生：预设JMX接口用于快速切换同步模式

## 第7条：链路追踪

### 混沌场景：

跨服务调用无法关联日志。

我们需要有链路追踪方案。

### 全链路方案：

```
// 拦截器注入traceId
MDC.put("traceId", UUID.randomUUID().toString().substring(0,8));

// 日志格式包含traceId
<pattern>%d{HH:mm:ss} |%X{traceId}| %msg%n</pattern>
```

可以在MDC中设置traceId。

后面可以通过traceId全链路追踪日志。

流程图如下：

![img.png](../assets/architecture/chain_watch.png)

## 第8条：动态调参

### 半夜重启的痛：

线上问题需要临时开DEBUG日志，比如：查询用户的某次异常操作的日志。

### 热更新方案：

```java

@GetMapping("/logLevel")
public String changeLogLevel(
        @RequestParam String loggerName,
        @RequestParam String level) {

    Logger logger = (Logger) LoggerFactory.getLogger(loggerName);
    logger.setLevel(Level.valueOf(level)); // 立即生效
    return "OK";
}

```

有时候我们需要临时打印DEBUG日志，这就需要有个动态参数控制了。

否则每次调整打印日志级别都需要重启服务，可能会影响用户的正常使用。

```
journey
    title 日志级别动态调整
    section 旧模式
        发现问题 --> 修改配置 --> 重启应用 --> 丢失现场
    section 新模式
        发现问题 --> 动态调整 --> 立即生效 --> 保持现场
```

## 第9条：结构化存储

### 混沌日志：

```
用户购买了苹果手机 订单号1001 金额8999
```

上面的日志拼接成了一个字符串，虽说中间有空格分隔了，但哪些字段对应了哪些值，看起来不是很清楚。

我们在存储日志的时候，需要做结构化存储，方便快速的查询和搜索。

### 机器友好式日志：

```json
{
  "event": "ORDER_CREATE",
  "orderId": 1001,
  "amount": 8999,
  "products": [
    {
      "name": "iPhone",
      "sku": "A123"
    }
  ]
}
```

这里使用了json格式存储日志。

日志中的数据一目了然。

## 第10条：智能监控

### 最失败案例：

某次用户开通会员操作，错误日志堆积3天才被发现，黄花菜都凉了。

我们需要在项目中引入智能监控。

### ELK监控方案：

![img.png](../assets/architecture/elk.png)

### 报警规则示例：

```
ERROR日志连续5分钟 > 100条 → 电话告警  
WARN日志持续1小时 → 邮件通知
```

## 日志方案总结

研发人员的三大境界：

青铜：System.out.println("error！")

钻石：标准化日志 + ELK监控

王者：

- 日志驱动代码优化
- 异常预测系统
- 根因分析AI模型

最后的灵魂拷问：

**下次线上故障时，你的日志能让新人5分钟定位问题吗？**