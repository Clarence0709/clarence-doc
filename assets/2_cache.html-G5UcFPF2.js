import{_ as i,c,b as t,a as n,f as a,d as p,e as l,r as o,o as r}from"./app-DUs1hYTd.js";const d="/clarence-doc/assets/cache-diff-one-Bpb7jqin.png",u="/clarence-doc/assets/cache-diff-two-Cl0Q5lfW.png",k="/clarence-doc/assets/cluster-diff-D6J8Cn5f.png",h="/clarence-doc/assets/master-slave-BSrsbb4N.png",v="/clarence-doc/assets/sentinel-CuNCHUgR.png",m="/clarence-doc/assets/redis-cluster-RUPgRvZA.png",g={};function b(y,s){const e=o("RouteLink");return r(),c("div",null,[s[5]||(s[5]=t(`<h1 id="java总结-缓存" tabindex="-1"><a class="header-anchor" href="#java总结-缓存"><span>Java总结-缓存</span></a></h1><h2 id="一、缓存和数据库双写不一致性问题" tabindex="-1"><a class="header-anchor" href="#一、缓存和数据库双写不一致性问题"><span>一、缓存和数据库双写不一致性问题</span></a></h2><p><strong>【场景一】</strong> 先操作缓存，再写数据库成功之前，如果有读请求发生，可能导致旧数据入缓存，引发数据不一致。在分布式环境下，数据的读 写都是并发的，一个服务多机器部署，对同一个数据进行读写，在数据库层面并不能保证完成顺序，就有可能后读的操作先完成 （读取到的是脏数据），如果不采用给缓存设置过期时间策略，该数据永远都是脏数据。</p><h3 id="_1、延迟双删" tabindex="-1"><a class="header-anchor" href="#_1、延迟双删"><span>1、延迟双删</span></a></h3><p><strong>【解决办法】</strong>：<br></p><ul><li>可采用更新前后双删除缓存策略；<br><blockquote><p>参考链接：<a href="https://mp.weixin.qq.com/s/CR7e6pjKd5cPdVnkq5mqbw" target="_blank" rel="noopener noreferrer">延迟双删如此好用，为何大厂从来不用</a></p></blockquote></li></ul><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">TimeUnit</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheService</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 缓存客户端，比如 Redis</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">CacheClient</span> cacheClient<span class="token punctuation">;</span></span>
<span class="line">    <span class="token comment">// 数据库服务接口</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token class-name">CacheService</span><span class="token punctuation">(</span><span class="token class-name">CacheClient</span> cacheClient<span class="token punctuation">,</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>cacheClient <span class="token operator">=</span> cacheClient<span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>databaseService <span class="token operator">=</span> databaseService<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateDataWithCache</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 1. 第一次删除缓存</span></span>
<span class="line">        cacheClient<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 2. 更新数据库</span></span>
<span class="line">        databaseService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 3. 延迟删除缓存</span></span>
<span class="line">        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token comment">// 延迟一段时间（具体时间根据业务实际情况设定，通常是事务提交所需时间）</span></span>
<span class="line">                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                cacheClient<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;延迟双删任务被中断：&quot;</span> <span class="token operator">+</span> e<span class="token punctuation">.</span><span class="token function">getMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>可以通过“串行化”解决，保证同一个数据的读写落在同一个后端服务上:</p><ul><li><p>核心思路：</p><p>通过<span style="color:red;"><strong>哈希一致性或分布式锁，确保对同一个 key 的读写请求串行执行</strong></span>，从而避免并发冲突。</p></li></ul></li></ul><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReentrantLock</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CacheServiceWithSerialization</span> <span class="token punctuation">{</span></span>
<span class="line">     <span class="token comment">// 缓存客户端</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">CacheClient</span> cacheClient<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment">// 数据库服务接口</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token class-name">DatabaseService</span> databaseService<span class="token punctuation">;</span></span>
<span class="line">     <span class="token comment">// 本地锁示例</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateDataWithSerialization</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 获取分布式锁，确保同一时刻只有一个线程操作 key</span></span>
<span class="line">        <span class="token keyword">boolean</span> lockAcquired <span class="token operator">=</span> <span class="token class-name">DistributedLock</span><span class="token punctuation">.</span><span class="token function">tryLock</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>lockAcquired<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;未能获得锁，操作已被其他线程占用&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">return</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token comment">// 1. 写缓存</span></span>
<span class="line">            cacheClient<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 2. 更新数据库</span></span>
<span class="line">            databaseService<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token comment">// 3. 删除缓存</span></span>
<span class="line">            cacheClient<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name">DistributedLock</span><span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 释放分布式锁</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>【场景二】</strong> 先操作数据库，再清除缓存。如果删缓存失败了，就会出现数据不一致问题。</p><h3 id="_2、先删库-后删缓存" tabindex="-1"><a class="header-anchor" href="#_2、先删库-后删缓存"><span>2、先删库，后删缓存</span></a></h3><p><strong>【方案一】</strong> ：将删除失败的 key 值存入队列中重复删除，如下图：</p><p><img src="`+d+'" alt="img.png"></p><p>（1）更新数据库数据。</p><p>（2）缓存因为种种问题删除失败。</p><p>（3）将需要删除的 key 发送至消息队列。</p><p>（4）自己消费消息，获得需要删除的 key。</p><p>（5）继续重试删除操作，直到成功。</p><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>【缺点】：对业务线代码造成大量的侵入。于是有了方案二。</p></div><p><strong>【方案二】</strong>：通过订阅 binlog 获取需要重新删除的 Key 值数据。在应用程序中，另起一段程序，获得这个订阅程序传来的消息，进行删除缓存操作。</p><p><img src="'+u+'" alt="img.png"></p><p>（1）更新数据库数据</p><p>（2）数据库会将操作信息写入 binlog 日志当中</p><p>（3）订阅程序提取出所需要的数据以及 key</p><p>（4）另起一段非业务代码，获得该信息</p><p>（5）尝试删除缓存操作，发现删除失败</p><p>（6）将这些信息发送至消息队列</p><p>（7）重新从消息队列中获得该数据，重试操作</p><h2 id="二、redis-内存用完会发生什么" tabindex="-1"><a class="header-anchor" href="#二、redis-内存用完会发生什么"><span>二、Redis 内存用完会发生什么</span></a></h2><p>Redis 是一个基于内存的数据库，所有数据都存储在内存中。当内存用完时，Redis 的行为取决于配置，可能包括：</p><ul><li><p>默认情况下，新写入操作会失败，Redis 返回错误。</p></li><li><p>如果设置了 maxmemory 和 maxmemory-policy，Redis 会根据指定策略回收内存，比如淘汰最少使用的键（LRU 算法）或即将过期的键。</p></li><li><p><strong>如果没有合理配置，内存压力可能导致操作系统触发 OOM（Out of Memory）机制，将 Redis 进程终止</strong>。</p></li></ul><h2 id="三、redis-过期策略" tabindex="-1"><a class="header-anchor" href="#三、redis-过期策略"><span>三、Redis 过期策略？</span></a></h2><p>Redis 支持为某些键（key）设置过期时间（TTL，Time To Live），当键的生存时间过期后，Redis 会自动删除该键。过期策略是 Redis 保证键值过期自动清除的机制。</p><p>Redis 提供了多种方式来设置键的过期时间：</p><ul><li>使用 EXPIRE 命令设置键的过期时间。</li><li>使用 SET 命令的 EX（秒）和 PX（毫秒）参数来设置过期时间。</li><li>使用 PERSIST 命令来移除过期时间。</li></ul><p>Redis 的过期策略包括：</p><p><strong>惰性删除</strong>：当你访问某个键时，Redis 会检查该键是否已经过期，如果过期则删除它。换句话说，只有当你访问过期的键时，它才会被删除。</p><p><strong>定期删除</strong>：为了避免惰性删除带来的性能问题，Redis 会周期性地检查一些键的过期时间，并删除那些已经过期的键。这个操作是通过定时任务（默认每 100 毫秒）进行的，检查一部分过期的键。</p><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>但是实际上这还是有问题的，如果定期删除漏掉了很多过期 key，然后你也没及时去查，也就没走惰性删除，此时会怎么样？如果大量过期 key 堆积在内存里，导致 Redis 内存块耗尽了，咋整？</p><p>答案是：<strong>走内存淘汰机制</strong>。</p></div><h2 id="四、redis-内存淘汰机制" tabindex="-1"><a class="header-anchor" href="#四、redis-内存淘汰机制"><span>四、Redis 内存淘汰机制</span></a></h2><h3 id="_1、常见的淘汰机制对比" tabindex="-1"><a class="header-anchor" href="#_1、常见的淘汰机制对比"><span>1、常见的淘汰机制对比</span></a></h3><table><thead><tr><th>策略名称</th><th>描述</th></tr></thead><tbody><tr><td>noeviction</td><td>默认策略，当内存不足时，不会淘汰任何数据，新写操作会失败，返回错误。</td></tr><tr><td>allkeys-lru</td><td>从所有键中移除最近最少使用的键（基于 LRU）。</td></tr><tr><td>volatile-lru</td><td>从设置了过期时间的键中移除最近最少使用的键（基于 LRU）。</td></tr><tr><td>allkeys-random</td><td>从所有键中随机移除一个键。</td></tr><tr><td>volatile-random</td><td>从设置了过期时间的键中随机移除一个键。</td></tr><tr><td>volatile-ttl</td><td>从设置了过期时间的键中移除即将过期（TTL 最小）的键。</td></tr><tr><td>allkeys-lfu</td><td>从所有键中移除最不常使用的键（基于 LFU）。</td></tr><tr><td>volatile-lfu</td><td>从设置了过期时间的键中移除最不常使用的键（基于 LFU）。</td></tr></tbody></table><h3 id="_2、手写一个-lru-算法" tabindex="-1"><a class="header-anchor" href="#_2、手写一个-lru-算法"><span>2、手写一个 LRU 算法</span></a></h3><h2 id="五、缓存穿透、缓存击穿、缓存雪崩和缓存刷新" tabindex="-1"><a class="header-anchor" href="#五、缓存穿透、缓存击穿、缓存雪崩和缓存刷新"><span>五、缓存穿透、缓存击穿、缓存雪崩和缓存刷新</span></a></h2><p><strong>【1】缓存穿透（Cache Penetration）</strong>：</p><p>缓存穿透是指查询一个数据，如果这个<span style="color:red;"><strong>数据在缓存中不存在并且数据库中也不存在</strong></span>，那么该请求会直接访问数据库。这种情况会导致每次请求都去查询数据库，从而绕过了缓存机制，影响系统的性能。</p><p><strong>发生原因</strong>：</p><ul><li>用户查询的数据在缓存和数据库中都没有，通常是由于缓存的空数据没有设置好（没有缓存失败的记录）或者数据库中并未存在数据。</li></ul><p><strong>应对方案：</strong></p><ul><li><p><strong>缓存空对象</strong>： 对于查询结果为空的数据，可以将空数据（例如，返回空的 JSON 或者一个特殊的标志值）也缓存一段时间，避免重复查询数据库。</p></li><li><p><strong>布隆过滤器（Bloom Filter）</strong>：通过布隆过滤器在查询缓存之前先过滤掉那些根本不存在的数据，避免无效查询直接到数据库。</p></li><li><p><strong>全局查询校验</strong>：使用应用层或 API 层的校验来保证访问的数据必须经过有效性验证。</p></li></ul><p><strong>【2】缓存击穿（Cache Breakdown）</strong>：</p><p>缓存击穿是指<span style="color:red;"><strong>某一时刻，大量的请求同时访问某个缓存失效的数据</strong></span>（通常是在数据的缓存过期的瞬间），导致大量请求同时访问数据库，进而产生数据库的压力。</p><p><strong>发生原因</strong>：</p><ul><li>因为缓存过期时间统一，导致缓存过期的瞬间会有多个请求同时访问，造成缓存失效瞬间的流量激增，影响数据库性能。</li></ul><p><strong>应对方案：</strong></p><ul><li><p><strong>设置合理的缓存过期时间</strong>：使用不易过期或者过期时间设置得较为分散，避免同一时刻缓存大量失效。</p></li><li><p><strong>加锁机制（缓存重建时锁）</strong>：当缓存失效时，第一个请求会去数据库查询并更新缓存，其他请求等待缓存更新，避免同一时刻多个请求同时访问数据库。</p></li><li><p><strong>互斥锁（Mutex Lock）或 Redis 分布式锁</strong>：通过加锁机制，确保只有一个请求去数据库查询数据，缓存中的数据可以在请求期间重建。</p></li></ul><p><strong>【3】缓存雪崩（Cache Avalanche）</strong>:</p><p>缓存雪崩是指<span style="color:red;"><strong>在同一时刻大量缓存过期或失效，导致大量请求直接访问数据库</strong></span>，最终造成数据库的压力过大，无法承载，系统可能出现崩溃。</p><p><strong>发生原因</strong>：</p><ul><li><p>缓存的过期时间过于集中，导致缓存同时过期。</p></li><li><p>配置不当的缓存策略或没有分布式缓存的协调，导致大量请求访问后端数据库。</p></li></ul><p><strong>应对方案</strong>：</p><ul><li><p><strong>避免缓存集中失效</strong>：使用缓存的过期时间设置为随机值（例如，加上一些随机的时间范围），使得缓存过期时间不一致。</p></li><li><p><strong>使用备用缓存（热点数据预热）</strong>：对于重要数据，可以通过定时任务或者主动刷新策略提前预加载缓存，以避免数据库被打爆。</p></li><li><p><strong>限流、降级机制</strong>：使用熔断、限流、降级等策略，防止系统在数据库压力过大的时候还继续请求。</p></li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>对于 Redis 挂掉了，请求全部走数据库，也属于缓存雪崩，我们可以有以下思路进行解决：</p><p><strong>事发前</strong>：实现 Redis 的高可用（主从架构+Sentinel 或者 Redis Cluster），尽可能避免 Redis 挂掉这种情况。</p><p><strong>事发中</strong>：万一 Redis 真的挂了，我们可以设置本地缓存（ehcache）+ 限流（hystrix），尽量避免我们的数据库被干掉。</p><p><strong>事发后</strong>：Redis 持久化，重启后自动从磁盘上加载数据，快速恢复缓存数据。</p></div><p><strong>【4】缓存刷新（Cache Refresh）</strong>：</p><p>缓存刷新是指缓存中的数据保持实时性的问题，需要保证缓存和数据库中的数据一致性或定期更新缓存数据。</p><p><strong>原因</strong>：</p><ul><li>缓存的更新和数据库中的数据不一致，可能会导致读取的缓存数据是过时的。</li></ul><p><strong>应对方案</strong>：</p><ul><li><p><strong>主动更新缓存</strong>：在对数据库数据进行写操作时，主动删除缓存或更新缓存中的相关数据，保持一致性。</p></li><li><p><strong>设置合理的缓存过期时间</strong>：定期失效缓存，以促使系统进行数据刷新。</p></li><li><p><strong>双写策略（写缓存与写数据库）</strong>：对于需要更新数据的操作，可以使用 &quot;先更新缓存再更新数据库&quot; 或者 &quot;先更新数据库再更新缓存&quot; 等方式来确保缓存及时刷新。</p></li><li><p><strong>定时刷新</strong>：使用定时任务定期更新缓存数据，避免缓存内容过于陈旧。</p></li></ul><h2 id="六、redis-的常用数据结构有哪些" tabindex="-1"><a class="header-anchor" href="#六、redis-的常用数据结构有哪些"><span>六、Redis 的常用数据结构有哪些？</span></a></h2><p><strong>String</strong></p><ul><li>最常规的 set/get 操作，Value 可以是 String 也可以是数字。一般做一些复杂的计数功能的缓存。</li></ul><p><strong>Hash</strong></p><ul><li>这里 Value 存放的是结构化的对象，比较方便的就是操作其中的某个字段。我在做单点登录的时 候，就是用这种数据结构存储用户信息，以 CookieId 作为 Key，设置 30 分钟为缓存过期时间，能 很好的模拟出类似 Session 的效果。</li></ul><p><strong>List</strong></p><ul><li>使用 List 的数据结构，可以做简单的消息队列的功能。另外，可以利用 lrange 命令，做基于 Redis 的分页功能，性能极佳，用户体验好。</li></ul><p><strong>Set</strong></p><ul><li>因为 Set 堆放的是一堆不重复值的集合。所以可以做全局去重的功能。我们的系统一般都是集群部 署，使用 JVM 自带的 Set 比较麻烦。另外，就是利用交集、并集、差集等操作，可以计算共同喜 好，全部的喜好，自己独有的喜好等功能。</li></ul><p><strong>Sorted Set</strong></p><ul><li>Sorted Set 多了一个权重参数 Score，集合中的元素能够按 Score 进行排列。可以做排行榜应用， 取 TOP(N) 操作。Sorted Set 可以用来做延时任务。</li></ul>',80)),n("p",null,[s[1]||(s[1]=n("strong",null,"更多类型",-1)),s[2]||(s[2]=a("： ")),p(e,{to:"/cache/1_data_structure.md"},{default:l(()=>s[0]||(s[0]=[a("Redis数据结构")])),_:1})]),s[6]||(s[6]=t('<h2 id="七、本地缓存与分布式缓存区别" tabindex="-1"><a class="header-anchor" href="#七、本地缓存与分布式缓存区别"><span>七、本地缓存与分布式缓存区别</span></a></h2><p><strong>本地缓存的优势</strong>是没有网络开销，在大并发量时用好本地缓存很重要；</p><p><strong>分布式缓存</strong>比如 Redis 优势是能够无限扩容量和多个系统公用缓存数据，结合这个去在业务中使用缓存是很重要的。</p><p><strong>本地缓存的缺点</strong>是会占用堆内存，影响垃圾回收、影响系统性能;</p><p><strong>分布式缓存</strong>两大开销（网络延迟和对象序列化）会导致其慢于本地缓存，同时也需要搭建分布式缓存系统。</p><p><strong>建议</strong>：</p><ul><li><p>进程内缓存适用于较小且频率可见的访问场景；</p></li><li><p>尤其适用于不变对象，对于较大且不可预见的访问，最好采用分布式缓存。</p></li></ul><h2 id="八、redis-的线程模型" tabindex="-1"><a class="header-anchor" href="#八、redis-的线程模型"><span>八、Redis 的线程模型</span></a></h2><p>todo</p><h2 id="九、redis-的并发竞争问题如何解决" tabindex="-1"><a class="header-anchor" href="#九、redis-的并发竞争问题如何解决"><span>九、Redis 的并发竞争问题如何解决</span></a></h2><p>todo</p><h2 id="十、了解-redis-的事务吗" tabindex="-1"><a class="header-anchor" href="#十、了解-redis-的事务吗"><span>十、了解 Redis 的事务吗？</span></a></h2><p>todo</p><h2 id="十一、redis-的选举算法和流程是怎样的" tabindex="-1"><a class="header-anchor" href="#十一、redis-的选举算法和流程是怎样的"><span>十一、Redis 的选举算法和流程是怎样的</span></a></h2><p>todo</p><h2 id="十二、redis-的持久化的机制" tabindex="-1"><a class="header-anchor" href="#十二、redis-的持久化的机制"><span>十二、Redis 的持久化的机制</span></a></h2><p>todo</p><h2 id="十三、什么是缓存预热" tabindex="-1"><a class="header-anchor" href="#十三、什么是缓存预热"><span>十三、什么是缓存预热？</span></a></h2><p>新的缓存系统没有任何数据，在缓存重建数据的过程中，系统性能和数据负载都不太好，所以最好在系统上线之前就把缓存的热点数据加载到缓存中，这种缓存预加载手段就是缓存预热。</p><h2 id="十四、什么是缓存热备" tabindex="-1"><a class="header-anchor" href="#十四、什么是缓存热备"><span>十四、什么是缓存热备？</span></a></h2><p>缓存热备既当一个缓存服务器不可用时能实时切换到备用缓存服务器，不影响缓存使用。集群模式下，每个主节点都会有一个或多个从节点备用，一旦主节点挂掉，从节点会被哨兵提升为主节点使用。</p><h2 id="十五、redis-集群问题总结" tabindex="-1"><a class="header-anchor" href="#十五、redis-集群问题总结"><span>十五、Redis 集群问题总结</span></a></h2><h3 id="_1、redis-集群分类" tabindex="-1"><a class="header-anchor" href="#_1、redis-集群分类"><span>1、Redis 集群分类</span></a></h3><p><img src="'+k+'" alt="img.png"></p><h3 id="_2、redis-集群如何搭建" tabindex="-1"><a class="header-anchor" href="#_2、redis-集群如何搭建"><span>2、Redis 集群如何搭建？</span></a></h3><h4 id="主从模式方案" tabindex="-1"><a class="header-anchor" href="#主从模式方案"><span>主从模式方案</span></a></h4><p><img src="'+h+'" alt="img.png"></p><ul><li>部署实测：todo</li></ul><h4 id="哨兵模式方案" tabindex="-1"><a class="header-anchor" href="#哨兵模式方案"><span>哨兵模式方案：</span></a></h4><p><img src="'+v+'" alt="img.png"></p><ul><li>部署实测：<a href="https://blog.csdn.net/weixin_43108539/article/details/145148482" target="_blank" rel="noopener noreferrer">三台 Centos7.9 中 Docker 部署 Redis 哨兵模式</a></li></ul><h4 id="集群模式方案" tabindex="-1"><a class="header-anchor" href="#集群模式方案"><span>集群模式方案：</span></a></h4><p><img src="'+m+'" alt="img.png"></p><ul><li>部署实测：<a href="https://blog.csdn.net/weixin_43108539/article/details/145098017" target="_blank" rel="noopener noreferrer">三台 Centos7.9 中 Docker 部署 Redis 集群模式</a></li></ul><h2 id="十刘、redis-集群同步数据" tabindex="-1"><a class="header-anchor" href="#十刘、redis-集群同步数据"><span>十刘、Redis 集群同步数据</span></a></h2><p>todo</p><h2 id="十七、redis-的主从复制原理" tabindex="-1"><a class="header-anchor" href="#十七、redis-的主从复制原理"><span>十七、Redis 的主从复制原理</span></a></h2><p>todo</p><h2 id="十八、知道哪些-redis-的优化操作" tabindex="-1"><a class="header-anchor" href="#十八、知道哪些-redis-的优化操作"><span>十八、知道哪些 Redis 的优化操作</span></a></h2><h2 id="十九、怎么使用-redis-实现消息队列" tabindex="-1"><a class="header-anchor" href="#十九、怎么使用-redis-实现消息队列"><span>十九、怎么使用 Redis 实现消息队列？</span></a></h2><h2 id="二十、redis-热-key-问题如何解决" tabindex="-1"><a class="header-anchor" href="#二十、redis-热-key-问题如何解决"><span>二十、Redis 热 Key 问题如何解决?</span></a></h2><p>热key问题是指某些键因高频访问导致Redis性能瓶颈或集群压力过高。</p><h3 id="_1、可预见的热key处理" tabindex="-1"><a class="header-anchor" href="#_1、可预见的热key处理"><span>1、可预见的热Key处理</span></a></h3><ul><li>根据经验，提前预测</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>这种方法在大多数情况下还是比较有效的。比较常见的就是电商系统中，会在秒杀、抢购等业务开始前就能预测出热key。 但是，这种方法局限性也很大，就是有些热key是完全没办法预测的，比如明星什么时候要官宣这种事情就无法预测。</p></div><ul><li>多级缓存处理</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p></div><ul><li>热key备份</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p></div><ul><li>热key拆分</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p></div><p>原文链接：https://blog.csdn.net/weixin_45433817/article/details/130814075</p><h3 id="_2、不可预见的热key处理" tabindex="-1"><a class="header-anchor" href="#_2、不可预见的热key处理"><span>2、不可预见的热Key处理</span></a></h3><blockquote><p>参考代码：<a href="https://gitee.com/jd-platform-opensource/hotkey" target="_blank" rel="noopener noreferrer">https://gitee.com/jd-platform-opensource/hotkey</a></p></blockquote><h2 id="二十一、redis大-key-问题如何解决" tabindex="-1"><a class="header-anchor" href="#二十一、redis大-key-问题如何解决"><span>二十一、Redis大 Key 问题如何解决?</span></a></h2><h2 id="二十二、redis-6-x-为什么要引入多线程" tabindex="-1"><a class="header-anchor" href="#二十二、redis-6-x-为什么要引入多线程"><span>二十二、Redis 6.x 为什么要引入多线程?</span></a></h2><h2 id="二十三、redis-说说分布式锁" tabindex="-1"><a class="header-anchor" href="#二十三、redis-说说分布式锁"><span>二十三、Redis 说说分布式锁？</span></a></h2>',57)),n("ul",null,[n("li",null,[s[4]||(s[4]=a("点击查看 ")),p(e,{to:"/cache/1_redis#redis分布式锁"},{default:l(()=>s[3]||(s[3]=[a("分布式锁")])),_:1})])])])}const R=i(g,[["render",b],["__file","2_cache.html.vue"]]),_=JSON.parse('{"path":"/interview/2_cache.html","title":"Java总结-缓存","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、缓存和数据库双写不一致性问题","slug":"一、缓存和数据库双写不一致性问题","link":"#一、缓存和数据库双写不一致性问题","children":[{"level":3,"title":"1、延迟双删","slug":"_1、延迟双删","link":"#_1、延迟双删","children":[]},{"level":3,"title":"2、先删库，后删缓存","slug":"_2、先删库-后删缓存","link":"#_2、先删库-后删缓存","children":[]}]},{"level":2,"title":"二、Redis 内存用完会发生什么","slug":"二、redis-内存用完会发生什么","link":"#二、redis-内存用完会发生什么","children":[]},{"level":2,"title":"三、Redis 过期策略？","slug":"三、redis-过期策略","link":"#三、redis-过期策略","children":[]},{"level":2,"title":"四、Redis 内存淘汰机制","slug":"四、redis-内存淘汰机制","link":"#四、redis-内存淘汰机制","children":[{"level":3,"title":"1、常见的淘汰机制对比","slug":"_1、常见的淘汰机制对比","link":"#_1、常见的淘汰机制对比","children":[]},{"level":3,"title":"2、手写一个 LRU 算法","slug":"_2、手写一个-lru-算法","link":"#_2、手写一个-lru-算法","children":[]}]},{"level":2,"title":"五、缓存穿透、缓存击穿、缓存雪崩和缓存刷新","slug":"五、缓存穿透、缓存击穿、缓存雪崩和缓存刷新","link":"#五、缓存穿透、缓存击穿、缓存雪崩和缓存刷新","children":[]},{"level":2,"title":"六、Redis 的常用数据结构有哪些？","slug":"六、redis-的常用数据结构有哪些","link":"#六、redis-的常用数据结构有哪些","children":[]},{"level":2,"title":"七、本地缓存与分布式缓存区别","slug":"七、本地缓存与分布式缓存区别","link":"#七、本地缓存与分布式缓存区别","children":[]},{"level":2,"title":"八、Redis 的线程模型","slug":"八、redis-的线程模型","link":"#八、redis-的线程模型","children":[]},{"level":2,"title":"九、Redis 的并发竞争问题如何解决","slug":"九、redis-的并发竞争问题如何解决","link":"#九、redis-的并发竞争问题如何解决","children":[]},{"level":2,"title":"十、了解 Redis 的事务吗？","slug":"十、了解-redis-的事务吗","link":"#十、了解-redis-的事务吗","children":[]},{"level":2,"title":"十一、Redis 的选举算法和流程是怎样的","slug":"十一、redis-的选举算法和流程是怎样的","link":"#十一、redis-的选举算法和流程是怎样的","children":[]},{"level":2,"title":"十二、Redis 的持久化的机制","slug":"十二、redis-的持久化的机制","link":"#十二、redis-的持久化的机制","children":[]},{"level":2,"title":"十三、什么是缓存预热？","slug":"十三、什么是缓存预热","link":"#十三、什么是缓存预热","children":[]},{"level":2,"title":"十四、什么是缓存热备？","slug":"十四、什么是缓存热备","link":"#十四、什么是缓存热备","children":[]},{"level":2,"title":"十五、Redis 集群问题总结","slug":"十五、redis-集群问题总结","link":"#十五、redis-集群问题总结","children":[{"level":3,"title":"1、Redis 集群分类","slug":"_1、redis-集群分类","link":"#_1、redis-集群分类","children":[]},{"level":3,"title":"2、Redis 集群如何搭建？","slug":"_2、redis-集群如何搭建","link":"#_2、redis-集群如何搭建","children":[]}]},{"level":2,"title":"十刘、Redis 集群同步数据","slug":"十刘、redis-集群同步数据","link":"#十刘、redis-集群同步数据","children":[]},{"level":2,"title":"十七、Redis 的主从复制原理","slug":"十七、redis-的主从复制原理","link":"#十七、redis-的主从复制原理","children":[]},{"level":2,"title":"十八、知道哪些 Redis 的优化操作","slug":"十八、知道哪些-redis-的优化操作","link":"#十八、知道哪些-redis-的优化操作","children":[]},{"level":2,"title":"十九、怎么使用 Redis 实现消息队列？","slug":"十九、怎么使用-redis-实现消息队列","link":"#十九、怎么使用-redis-实现消息队列","children":[]},{"level":2,"title":"二十、Redis 热 Key 问题如何解决?","slug":"二十、redis-热-key-问题如何解决","link":"#二十、redis-热-key-问题如何解决","children":[{"level":3,"title":"1、可预见的热Key处理","slug":"_1、可预见的热key处理","link":"#_1、可预见的热key处理","children":[]},{"level":3,"title":"2、不可预见的热Key处理","slug":"_2、不可预见的热key处理","link":"#_2、不可预见的热key处理","children":[]}]},{"level":2,"title":"二十一、Redis大 Key 问题如何解决?","slug":"二十一、redis大-key-问题如何解决","link":"#二十一、redis大-key-问题如何解决","children":[]},{"level":2,"title":"二十二、Redis 6.x 为什么要引入多线程?","slug":"二十二、redis-6-x-为什么要引入多线程","link":"#二十二、redis-6-x-为什么要引入多线程","children":[]},{"level":2,"title":"二十三、Redis 说说分布式锁？","slug":"二十三、redis-说说分布式锁","link":"#二十三、redis-说说分布式锁","children":[]}],"git":{"updatedTime":1739284643000,"contributors":[{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":10,"url":"https://github.com/Clarence"},{"name":"hanchen","username":"hanchen","email":"hanchen@c-sc.cn","commits":4,"url":"https://github.com/hanchen"},{"name":"hanchen","username":"hanchen","email":"1154937362@qq.com","commits":4,"url":"https://github.com/hanchen"}]},"filePathRelative":"interview/2_cache.md"}');export{R as comp,_ as data};
