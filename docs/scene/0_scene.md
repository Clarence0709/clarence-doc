# 常见的场景问题

## 一、分布式系统主键如何处理？

### 1、节点生成 or 主键服务？

### 2、主键类型的选择？

## 二、针对于过期的订单，如何处理？

[处理过期订单，Redis不推荐，那如何做呢？](https://mp.weixin.qq.com/s/aHtIW4vmrl-0rUcPI3T7ZQ)

### 1、消息队列
### 2、Redisson DelayedQueue
### 3、Redis 过期监听
### 4、RabbitMQ 死信队列
### 5、时间轮

## 三、如何实现自动登录功能？


## 四、对外的Api安全问题如何保证？

完成自己的实现后，继续写完

[Spring Cloud微服务，如何保证对外接口的安全？](https://mp.weixin.qq.com/s/kZZMQcAQh4XLF8sgsxT__g)

## 五、基于阻塞队列实现生产者和消费者模型

> 参考地址：[https://blog.csdn.net/m0_73381672/article/details/133690633](https://blog.csdn.net/m0_73381672/article/details/133690633)

核心方法代码：
```java
/**
 * 手动阻塞队列
 * 
 */
public class MyBlockingQueue {

    //锁对象
    private Object object = new Object();

    //队列采用循环队列  数组
    private String[] data = new String[1000];

    //头指针 加volatile防止内存可见性问题
    private volatile int head = 0;
    //尾指针
    private volatile int tail = 0;
    //有效长度
    private volatile int size = 0;

    //带有阻塞性质的入队操作put
    public void put(String str) throws InterruptedException {
        synchronized (object) {
            //队列满时
            while (size == data.length) {
                //阻塞等待 等待另一个线程调用notify方法唤醒
                object.wait();
            }
            //队列不满 入队列
            data[tail] = str;
            tail++;
            size++;
            object.notify();

            //由于数组循环使用 也防止索引出界
            if (tail == data.length) {
                tail = 0;
            }
        }
    }

    //带有阻塞性质的出队列操作
    public String take() throws InterruptedException {
        synchronized (object) {
            //队列为空
            while (size == 0) {
                //阻塞等待
                object.wait();
            }
            //队列不为空
            String tmp = data[head];
            head++;
            if (head == data.length) {
                head = 0;
            }
            size--;
            //唤醒
            object.notify();
            return tmp;
        }
    }
}
```
测试代码：
```java
/**
 * 借助阻塞队列 实现生产者消费者模型
 * */
public class Test {
    public static void main(String[] args) {
        MyBlockingQueue queue = new MyBlockingQueue();

        //生产者模型
        Thread t1 = new Thread(() -> {
            int num = 1;
            while (true) {
                try {
                    queue.put(String.valueOf(num));
                    System.out.println("生产者生产" + num);
                    num++;
                    //生产者有节奏生产
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        //消费者模型
        Thread t2 = new Thread(() -> {
            while (true) {
                try {
                    int tmp = Integer.parseInt(queue.take());
                    System.out.println("消费者消费" + tmp);
                    //消费者有节奏消费
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        t1.start();
        t2.start();
    }
}
```

## 六、如何设计一个高并发系统？

解答：<RouteLink to="/currency/4_high_concurrency_sys">高并发-如何设计一个高并发系统？</RouteLink>

## 七、分布式场景下是否适用 synchronized 加锁机制？

解答：[分布式场景下是否适用 synchronized 加锁机制？](https://mp.weixin.qq.com/s/IGS_8pIc2wSKN88eMEJmSg)

## 八、100 亿分库分表 如何设计？

解答：[携程面试：100 亿分库分表 如何设计？](https://mp.weixin.qq.com/s/xQtKtaLG8xRMbK-8b3Rzuw)
