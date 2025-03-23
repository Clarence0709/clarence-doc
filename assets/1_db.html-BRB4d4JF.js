import{_ as l,c as i,a as s,b as t,f as e,d as r,e as p,r as d,o}from"./app-D6HKu0Zf.js";const c={};function h(m,a){const n=d("RouteLink");return o(),i("div",null,[a[2]||(a[2]=s(`<h1 id="java总结-数据库" tabindex="-1"><a class="header-anchor" href="#java总结-数据库"><span>Java总结-数据库</span></a></h1><h2 id="一、数据库的隔离级别" tabindex="-1"><a class="header-anchor" href="#一、数据库的隔离级别"><span>一、数据库的隔离级别？</span></a></h2><h3 id="_1、-uncommitted-读未提交" tabindex="-1"><a class="header-anchor" href="#_1、-uncommitted-读未提交"><span>1、 Uncommitted（读未提交）</span></a></h3><ul><li>事务可以读取其他事务未提交的数据（脏读）。</li><li>可能会出现<strong>脏读（Dirty Read）、不可重复读（Non-repeatable Read）和幻读（Phantom Read）</strong>。</li><li>并发性能高，但数据一致性差。</li></ul><h3 id="_2、read-committed-读已提交" tabindex="-1"><a class="header-anchor" href="#_2、read-committed-读已提交"><span>2、Read Committed（读已提交）</span></a></h3><ul><li>事务只能读取已经提交的数据。</li><li><strong>避免脏读</strong>，但仍然可能出现<strong>不可重复读和幻读</strong>。</li><li>提高数据一致性，但可能影响性能。</li></ul><h3 id="_3、repeatable-read-可重复读" tabindex="-1"><a class="header-anchor" href="#_3、repeatable-read-可重复读"><span>3、Repeatable Read（可重复读）</span></a></h3><ul><li>事务在执行期间，多次读取相同的数据时，保证读取结果一致。</li><li>避免脏读和不可重复读，但可能仍然会有幻读。</li><li>MySQL InnoDB 通过 <strong>MVCC + Gap Lock</strong> 解决幻读问题。</li></ul><h3 id="_4、serializable-可串行化" tabindex="-1"><a class="header-anchor" href="#_4、serializable-可串行化"><span>4、Serializable（可串行化）</span></a></h3><ul><li>最高隔离级别，相当于事务<strong>串行执行</strong>，避免所有并发问题（脏读、不可重复读、幻读）。</li><li><strong>通过行级锁或表级锁实现</strong>，并发性能最差，适用于高数据一致性要求的场景。</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>SQL Server、Oracle 默认的隔离级别：Repeatable Read（可重读）级别。<br> Oracle 默认的隔离级别：Read Committed（读取已提交的）级别。</p></div><h3 id="_5、脏读和幻读的区别" tabindex="-1"><a class="header-anchor" href="#_5、脏读和幻读的区别"><span>5、脏读和幻读的区别</span></a></h3><p><strong>脏读</strong>和<strong>幻读</strong>都是数据库事务中的一致性问题，但它们本质上不一样，咱们来对比一下：</p><h4 id="🎯-1-脏读-dirty-read" tabindex="-1"><a class="header-anchor" href="#🎯-1-脏读-dirty-read"><span>🎯 <strong>1. 脏读 (Dirty Read)</strong></span></a></h4><ul><li><strong>定义</strong>：事务A读取了事务B尚未提交的数据，若B回滚，A就读到了无效数据。</li><li><strong>场景示例</strong>： <ul><li>事务B修改了一条记录但还没提交，事务A读取了这条数据。</li><li>结果事务B回滚了，事务A读取的数据就成了“脏数据”。</li></ul></li></ul><p><strong>例子</strong>：</p><ol><li>事务B将用户余额从100改成200，但未提交。</li><li>事务A读取了余额200。</li><li>事务B回滚，恢复余额为100。</li><li>事务A此时拿到的是错误的200。</li></ol><ul><li><strong>解决办法</strong>：<code>READ COMMITTED</code> 及以上隔离级别可以防止脏读。</li></ul><hr><h4 id="🎯-2-幻读-phantom-read" tabindex="-1"><a class="header-anchor" href="#🎯-2-幻读-phantom-read"><span>🎯 <strong>2. 幻读 (Phantom Read)</strong></span></a></h4><ul><li><strong>定义</strong>：事务A在读取数据集后，事务B插入、删除了数据，导致事务A再次读取时发现数据“多了”或“少了”，就像“幻觉”一样。</li><li><strong>场景示例</strong>： <ul><li>事务A统计订单表的记录有10条。</li><li>事务B插入了新订单，事务A再次查询，发现有11条，出现“幻读”。</li></ul></li></ul><p><strong>例子</strong>：</p><ol><li>事务A查询 <code>SELECT COUNT(*) FROM orders;</code> 结果为10条。</li><li>事务B插入了1条新订单并提交。</li><li>事务A再次查询，发现结果变成了11条。</li></ol><ul><li><strong>解决办法</strong>：<code>REPEATABLE READ</code> 级别可以防止“不可重复读”，但防不了“幻读”，要用**<code>SERIALIZABLE</code>** 或 <strong>悲观锁</strong>来解决幻读。</li></ul><hr><h4 id="🔥-总结对比" tabindex="-1"><a class="header-anchor" href="#🔥-总结对比"><span>🔥 <strong>总结对比</strong></span></a></h4><table><thead><tr><th>特点</th><th>脏读 (Dirty Read)</th><th>幻读 (Phantom Read)</th></tr></thead><tbody><tr><td><strong>定义</strong></td><td>读取到未提交的数据</td><td>读取到新增/删除的数据</td></tr><tr><td><strong>表现</strong></td><td>数据还没提交就被读取</td><td>数据条数“变化了”</td></tr><tr><td><strong>产生原因</strong></td><td>事务回滚导致数据失效</td><td>新增、删除导致数据集变化</td></tr><tr><td><strong>隔离级别</strong></td><td><code>READ COMMITTED</code> 防止</td><td><code>SERIALIZABLE</code> 防止/<code>REPEATABLE</code>下MVCC + Gap Lock防止</td></tr></tbody></table><h2 id="二、讲一讲mysql的索引" tabindex="-1"><a class="header-anchor" href="#二、讲一讲mysql的索引"><span>二、讲一讲MySql的索引？</span></a></h2><h3 id="_1、索引的原理" tabindex="-1"><a class="header-anchor" href="#_1、索引的原理"><span>1、索引的原理</span></a></h3><h3 id="_2、索引的类型" tabindex="-1"><a class="header-anchor" href="#_2、索引的类型"><span>2、索引的类型</span></a></h3><h3 id="_3、如何创建合理的索引" tabindex="-1"><a class="header-anchor" href="#_3、如何创建合理的索引"><span>3、如何创建合理的索引？</span></a></h3><h3 id="_4、索引如何优化" tabindex="-1"><a class="header-anchor" href="#_4、索引如何优化"><span>4、索引如何优化？</span></a></h3><h2 id="三、聚集索引和非聚集索引的区别" tabindex="-1"><a class="header-anchor" href="#三、聚集索引和非聚集索引的区别"><span>三、聚集索引和非聚集索引的区别？</span></a></h2><h3 id="_1、聚集索引" tabindex="-1"><a class="header-anchor" href="#_1、聚集索引"><span>1、聚集索引</span></a></h3><h3 id="_2、非聚集索引" tabindex="-1"><a class="header-anchor" href="#_2、非聚集索引"><span>2、非聚集索引</span></a></h3><h3 id="_3、回表了解吗" tabindex="-1"><a class="header-anchor" href="#_3、回表了解吗"><span>3、回表了解吗？</span></a></h3><h2 id="四、索引失效的场景有哪些" tabindex="-1"><a class="header-anchor" href="#四、索引失效的场景有哪些"><span>四、索引失效的场景有哪些？</span></a></h2><h3 id="_1、联合索引不满足最左匹配原则" tabindex="-1"><a class="header-anchor" href="#_1、联合索引不满足最左匹配原则"><span>1、联合索引不满足最左匹配原则</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>最左匹配原则不仅是“必须从最左列开始”，还涉及到“匹配过程中遇到范围查询 (&lt;, &gt;, BETWEEN, LIKE) 就会提前终止索引继续匹配”。</p><p>比如索引 (a, b, c)，查询 WHERE a=1 AND b&gt;10 AND c=3，c 就用不上索引了。</p></div><h3 id="_2、like查询的前导模糊匹配" tabindex="-1"><a class="header-anchor" href="#_2、like查询的前导模糊匹配"><span>2、like查询的前导模糊匹配</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>此种情况其实就是<strong>最左匹配原则</strong>，如下情况：<br></p><ul><li><p>LIKE &#39;keyword%&#39; ✅ 可以走索引</p></li><li><p>LIKE &#39;%keyword%&#39; ❌ 索引失效（前置 % 导致全表扫描）</p></li></ul></div><h3 id="_3、参与运算或使用函数" tabindex="-1"><a class="header-anchor" href="#_3、参与运算或使用函数"><span>3、参与运算或使用函数</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><p><strong>运算</strong>（WHERE salary*2 &gt; 2000）：索引列在运算后变成了表达式结果，索引用不上。</p><p><strong>函数</strong>（WHERE LEFT(name, 3) = &#39;Tom&#39;）：函数改变了索引列的值，也就失效了。</p></div><h3 id="_4、类型隐式转换" tabindex="-1"><a class="header-anchor" href="#_4、类型隐式转换"><span>4、类型隐式转换</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><ul><li><p>比如 phone 是 VARCHAR 类型，查询 WHERE phone = 123456789，会<strong>触发类型转换</strong>（把字符串转数字），导致索引失效。</p></li><li><p>改写成：WHERE phone = &#39;123456789&#39; ✅ 才能走索引。</p></li></ul></div><h3 id="_5、列使用or操作" tabindex="-1"><a class="header-anchor" href="#_5、列使用or操作"><span>5、列使用OR操作</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><ul><li><p>查询条件使用 <strong>OR</strong> 关键字，其中一个字段没有创建索引，则会导致整个查询语句索引失效；</p></li><li><p><strong>OR</strong> 里有范围查询（&lt;、&gt;、BETWEEN、LIKE &#39;%...&#39; 等），索引也可能失效。</p></li></ul></div><h3 id="_6、两列做比较-等于-不等于" tabindex="-1"><a class="header-anchor" href="#_6、两列做比较-等于-不等于"><span>6、两列做比较（等于/不等于）</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><ul><li><p>WHERE a = b ✅ 可以走索引（前提是 a、b 是索引列）</p></li><li><p>WHERE a != b ❌ 索引失效（因为范围太大，优化器更倾向全表扫描）</p></li></ul></div><h3 id="_7、is-not-null、not-in和not-exists" tabindex="-1"><a class="header-anchor" href="#_7、is-not-null、not-in和not-exists"><span>7、IS NOT NULL、NOT IN和NOT EXISTS</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><ul><li><p>IS NOT NULL ✅ 索引可能失效（要看版本和索引设计）</p></li><li><p>NOT IN ❌ 一般失效，但 NOT IN (索引列) 有时能优化成 Anti-Join</p></li><li><p>NOT EXISTS ✅ MySQL 8.0 优化了 NOT EXISTS，有时走索引</p></li></ul><p>例如：</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> customer_id <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">;</span>  <span class="token comment">-- 可能索引失效</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> orders <span class="token keyword">WHERE</span> customer_id <span class="token operator">NOT</span> <span class="token operator">IN</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">-- 索引一般失效</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="_8、-order-by导致索引失效" tabindex="-1"><a class="header-anchor" href="#_8、-order-by导致索引失效"><span>8、 order by导致索引失效</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><ul><li><p>单列索引排序 ✅ 能走索引</p></li><li><p>联合索引排序 ✅ 要按索引顺序排序，不能乱</p></li><li><p>排序方向必须一致，ORDER BY a ASC, b DESC ❌ 索引失效</p></li></ul><p>例如：</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token comment">-- 索引 (a, b)</span></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> a<span class="token punctuation">,</span> b<span class="token punctuation">;</span> <span class="token comment">-- ✅ 走索引</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> b<span class="token punctuation">,</span> a<span class="token punctuation">;</span> <span class="token comment">-- ❌ 索引失效</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h3 id="_9、参数不同导致索引失效" tabindex="-1"><a class="header-anchor" href="#_9、参数不同导致索引失效"><span>9、参数不同导致索引失效</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>MySQL 优化器会判断 &quot;索引扫描&quot; 和 &quot;全表扫描&quot; 的成本：</p><ul><li><p>如果查询结果占比 &lt;30%，走索引</p></li><li><p>如果查询结果占比 &gt;30%，全表扫描更快</p></li></ul><p>例如：</p><div class="language-sql line-numbers-mode" data-highlighter="prismjs" data-ext="sql" data-title="sql"><pre><code><span class="line"><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> users <span class="token keyword">WHERE</span> age <span class="token operator">&gt;</span> <span class="token number">10</span><span class="token punctuation">;</span>  <span class="token comment">-- 小表走索引，大表直接全表扫描</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></div><h3 id="_10、mysql优化器的其他优化策略" tabindex="-1"><a class="header-anchor" href="#_10、mysql优化器的其他优化策略"><span>10、Mysql优化器的其他优化策略</span></a></h3><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>比如优化器认为在某些情况下，全表扫描比走索引快，则它就会放弃索引:</p><ul><li><p>Union 合并：多个单列索引组合查询</p></li><li><p>Intersection 合并：多个条件筛选索引交集</p></li><li><p>Sort-Union 合并：排序+索引合并</p></li></ul></div><h2 id="五、mysql的存储引擎对比" tabindex="-1"><a class="header-anchor" href="#五、mysql的存储引擎对比"><span>五、Mysql的存储引擎对比</span></a></h2><h3 id="_1、myisam" tabindex="-1"><a class="header-anchor" href="#_1、myisam"><span>1、MyISAM</span></a></h3><p>（1）不支持事务，但是每次查询都是原子的；</p><p>（2）支持表级锁，即每次操作是对整个表加锁；</p><p>（3）存储表的总行数；</p><p>（4）一个 MYISAM 表有三个文件：索引文件、表结构文件、数据文件；</p><p>（5）采用菲聚集索引，索引文件的数据域存储指向数据文件的指针。辅索引与主索引基本一致，但是辅索引不用保证唯一性。</p><h3 id="_2、innodb" tabindex="-1"><a class="header-anchor" href="#_2、innodb"><span>2、InnoDb</span></a></h3><p>（1）支持 ACID 的事务，支持事务的四种隔离级别；</p><p>（2）支持行级锁及外键约束：因此可以支持写并发；</p><p>（3）不存储总行数：</p><p>（4）一个 InnoDb 引擎存储在一个文件空间（共享表空间，表大小不受操作系统控制，一个表可能分布在多个文件里），也有可能为多个 （设置为独立表空，表大小受操作系统文件大小限制，一般为 2G），受操作系统文件大小的限制；</p><p>（5）主键索引采用聚集索引（索引的数据域存储数据文件本身），辅索引的数据域存储主键的值；因此从辅索引查找数据，需要先通过辅 索引找到主键值，再访问辅索引；最好使用自增主键，防止插入数据时，为维持 B+树结构，文件的大调整。</p><h2 id="六、explain关键字的介绍" tabindex="-1"><a class="header-anchor" href="#六、explain关键字的介绍"><span>六、Explain关键字的介绍？</span></a></h2><h2 id="七、mysql的几种锁对比" tabindex="-1"><a class="header-anchor" href="#七、mysql的几种锁对比"><span>七、Mysql的几种锁对比？</span></a></h2>`,72)),t("p",null,[a[1]||(a[1]=e("更多详情请查看 ")),r(n,{to:"/database/1_mysql.md"},{default:p(()=>a[0]||(a[0]=[e("Mysql锁")])),_:1})]),a[3]||(a[3]=s('<h3 id="_1、共享锁-s锁" tabindex="-1"><a class="header-anchor" href="#_1、共享锁-s锁"><span>1、共享锁（S锁）</span></a></h3><h3 id="_2、排他锁-x锁" tabindex="-1"><a class="header-anchor" href="#_2、排他锁-x锁"><span>2、排他锁（X锁）</span></a></h3><h2 id="八、mysql的几种锁对比" tabindex="-1"><a class="header-anchor" href="#八、mysql的几种锁对比"><span>八、Mysql的几种锁对比？</span></a></h2><h2 id="九、说一下mvcc" tabindex="-1"><a class="header-anchor" href="#九、说一下mvcc"><span>九、说一下MVCC？</span></a></h2><h3 id="_1、mvcc原理" tabindex="-1"><a class="header-anchor" href="#_1、mvcc原理"><span>1、MVCC原理</span></a></h3><h3 id="_2、mysql是如何解决幻读的" tabindex="-1"><a class="header-anchor" href="#_2、mysql是如何解决幻读的"><span>2、Mysql是如何解决幻读的？</span></a></h3><h2 id="十、mysql的几种日志" tabindex="-1"><a class="header-anchor" href="#十、mysql的几种日志"><span>十、Mysql的几种日志？</span></a></h2><h2 id="十一、mysql集群分类" tabindex="-1"><a class="header-anchor" href="#十一、mysql集群分类"><span>十一、Mysql集群分类？</span></a></h2><h2 id="十二、mysql的主从同步原理" tabindex="-1"><a class="header-anchor" href="#十二、mysql的主从同步原理"><span>十二、Mysql的主从同步原理？</span></a></h2><h3 id="_1、mysql-5-7之前" tabindex="-1"><a class="header-anchor" href="#_1、mysql-5-7之前"><span>1、Mysql 5.7之前：</span></a></h3><h3 id="_2、mysql-5-7之后" tabindex="-1"><a class="header-anchor" href="#_2、mysql-5-7之后"><span>2、Mysql 5.7之后：</span></a></h3><h2 id="十三、mysql的执行流程" tabindex="-1"><a class="header-anchor" href="#十三、mysql的执行流程"><span>十三、Mysql的执行流程？</span></a></h2><h2 id="十四、高并发下-如何做到安全的修改同一行数据" tabindex="-1"><a class="header-anchor" href="#十四、高并发下-如何做到安全的修改同一行数据"><span>十四、高并发下，如何做到安全的修改同一行数据</span></a></h2><h2 id="十五、几个常见的影响mysql性能的案例" tabindex="-1"><a class="header-anchor" href="#十五、几个常见的影响mysql性能的案例"><span>十五、几个常见的影响MYSQL性能的案例？</span></a></h2>',14))])}const _=l(c,[["render",h],["__file","1_db.html.vue"]]),g=JSON.parse('{"path":"/interview/1_db.html","title":"Java总结-数据库","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、数据库的隔离级别？","slug":"一、数据库的隔离级别","link":"#一、数据库的隔离级别","children":[{"level":3,"title":"1、 Uncommitted（读未提交）","slug":"_1、-uncommitted-读未提交","link":"#_1、-uncommitted-读未提交","children":[]},{"level":3,"title":"2、Read Committed（读已提交）","slug":"_2、read-committed-读已提交","link":"#_2、read-committed-读已提交","children":[]},{"level":3,"title":"3、Repeatable Read（可重复读）","slug":"_3、repeatable-read-可重复读","link":"#_3、repeatable-read-可重复读","children":[]},{"level":3,"title":"4、Serializable（可串行化）","slug":"_4、serializable-可串行化","link":"#_4、serializable-可串行化","children":[]},{"level":3,"title":"5、脏读和幻读的区别","slug":"_5、脏读和幻读的区别","link":"#_5、脏读和幻读的区别","children":[]}]},{"level":2,"title":"二、讲一讲MySql的索引？","slug":"二、讲一讲mysql的索引","link":"#二、讲一讲mysql的索引","children":[{"level":3,"title":"1、索引的原理","slug":"_1、索引的原理","link":"#_1、索引的原理","children":[]},{"level":3,"title":"2、索引的类型","slug":"_2、索引的类型","link":"#_2、索引的类型","children":[]},{"level":3,"title":"3、如何创建合理的索引？","slug":"_3、如何创建合理的索引","link":"#_3、如何创建合理的索引","children":[]},{"level":3,"title":"4、索引如何优化？","slug":"_4、索引如何优化","link":"#_4、索引如何优化","children":[]}]},{"level":2,"title":"三、聚集索引和非聚集索引的区别？","slug":"三、聚集索引和非聚集索引的区别","link":"#三、聚集索引和非聚集索引的区别","children":[{"level":3,"title":"1、聚集索引","slug":"_1、聚集索引","link":"#_1、聚集索引","children":[]},{"level":3,"title":"2、非聚集索引","slug":"_2、非聚集索引","link":"#_2、非聚集索引","children":[]},{"level":3,"title":"3、回表了解吗？","slug":"_3、回表了解吗","link":"#_3、回表了解吗","children":[]}]},{"level":2,"title":"四、索引失效的场景有哪些？","slug":"四、索引失效的场景有哪些","link":"#四、索引失效的场景有哪些","children":[{"level":3,"title":"1、联合索引不满足最左匹配原则","slug":"_1、联合索引不满足最左匹配原则","link":"#_1、联合索引不满足最左匹配原则","children":[]},{"level":3,"title":"2、like查询的前导模糊匹配","slug":"_2、like查询的前导模糊匹配","link":"#_2、like查询的前导模糊匹配","children":[]},{"level":3,"title":"3、参与运算或使用函数","slug":"_3、参与运算或使用函数","link":"#_3、参与运算或使用函数","children":[]},{"level":3,"title":"4、类型隐式转换","slug":"_4、类型隐式转换","link":"#_4、类型隐式转换","children":[]},{"level":3,"title":"5、列使用OR操作","slug":"_5、列使用or操作","link":"#_5、列使用or操作","children":[]},{"level":3,"title":"6、两列做比较（等于/不等于）","slug":"_6、两列做比较-等于-不等于","link":"#_6、两列做比较-等于-不等于","children":[]},{"level":3,"title":"7、IS NOT NULL、NOT IN和NOT EXISTS","slug":"_7、is-not-null、not-in和not-exists","link":"#_7、is-not-null、not-in和not-exists","children":[]},{"level":3,"title":"8、 order by导致索引失效","slug":"_8、-order-by导致索引失效","link":"#_8、-order-by导致索引失效","children":[]},{"level":3,"title":"9、参数不同导致索引失效","slug":"_9、参数不同导致索引失效","link":"#_9、参数不同导致索引失效","children":[]},{"level":3,"title":"10、Mysql优化器的其他优化策略","slug":"_10、mysql优化器的其他优化策略","link":"#_10、mysql优化器的其他优化策略","children":[]}]},{"level":2,"title":"五、Mysql的存储引擎对比","slug":"五、mysql的存储引擎对比","link":"#五、mysql的存储引擎对比","children":[{"level":3,"title":"1、MyISAM","slug":"_1、myisam","link":"#_1、myisam","children":[]},{"level":3,"title":"2、InnoDb","slug":"_2、innodb","link":"#_2、innodb","children":[]}]},{"level":2,"title":"六、Explain关键字的介绍？","slug":"六、explain关键字的介绍","link":"#六、explain关键字的介绍","children":[]},{"level":2,"title":"七、Mysql的几种锁对比？","slug":"七、mysql的几种锁对比","link":"#七、mysql的几种锁对比","children":[{"level":3,"title":"1、共享锁（S锁）","slug":"_1、共享锁-s锁","link":"#_1、共享锁-s锁","children":[]},{"level":3,"title":"2、排他锁（X锁）","slug":"_2、排他锁-x锁","link":"#_2、排他锁-x锁","children":[]}]},{"level":2,"title":"八、Mysql的几种锁对比？","slug":"八、mysql的几种锁对比","link":"#八、mysql的几种锁对比","children":[]},{"level":2,"title":"九、说一下MVCC？","slug":"九、说一下mvcc","link":"#九、说一下mvcc","children":[{"level":3,"title":"1、MVCC原理","slug":"_1、mvcc原理","link":"#_1、mvcc原理","children":[]},{"level":3,"title":"2、Mysql是如何解决幻读的？","slug":"_2、mysql是如何解决幻读的","link":"#_2、mysql是如何解决幻读的","children":[]}]},{"level":2,"title":"十、Mysql的几种日志？","slug":"十、mysql的几种日志","link":"#十、mysql的几种日志","children":[]},{"level":2,"title":"十一、Mysql集群分类？","slug":"十一、mysql集群分类","link":"#十一、mysql集群分类","children":[]},{"level":2,"title":"十二、Mysql的主从同步原理？","slug":"十二、mysql的主从同步原理","link":"#十二、mysql的主从同步原理","children":[{"level":3,"title":"1、Mysql 5.7之前：","slug":"_1、mysql-5-7之前","link":"#_1、mysql-5-7之前","children":[]},{"level":3,"title":"2、Mysql 5.7之后：","slug":"_2、mysql-5-7之后","link":"#_2、mysql-5-7之后","children":[]}]},{"level":2,"title":"十三、Mysql的执行流程？","slug":"十三、mysql的执行流程","link":"#十三、mysql的执行流程","children":[]},{"level":2,"title":"十四、高并发下，如何做到安全的修改同一行数据","slug":"十四、高并发下-如何做到安全的修改同一行数据","link":"#十四、高并发下-如何做到安全的修改同一行数据","children":[]},{"level":2,"title":"十五、几个常见的影响MYSQL性能的案例？","slug":"十五、几个常见的影响mysql性能的案例","link":"#十五、几个常见的影响mysql性能的案例","children":[]}],"git":{"updatedTime":1742720327000,"contributors":[{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":4,"url":"https://github.com/Clarence"},{"name":"hanchen","username":"hanchen","email":"1154937362@qq.com","commits":7,"url":"https://github.com/hanchen"}]},"filePathRelative":"interview/1_db.md"}');export{_ as comp,g as data};
