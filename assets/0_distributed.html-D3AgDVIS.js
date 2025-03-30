import{_ as r,c as n,a as l,o as s}from"./app-_EpI1o87.js";const e={};function d(i,t){return s(),n("div",null,t[0]||(t[0]=[l('<h1 id="分布式架构" tabindex="-1"><a class="header-anchor" href="#分布式架构"><span>分布式架构</span></a></h1><p>参考链接：<a href="https://gitee.com/Doocs/advanced-java#%E5%88%86%E5%B8%83%E5%BC%8F%E7%B3%BB%E7%BB%9F" target="_blank" rel="noopener noreferrer">https://gitee.com/Doocs/advanced-java</a></p><h2 id="一、单体架构" tabindex="-1"><a class="header-anchor" href="#一、单体架构"><span>一、单体架构</span></a></h2><h3 id="_1-概念" tabindex="-1"><a class="header-anchor" href="#_1-概念"><span>1. 概念</span></a></h3><p>单体架构（Monolithic Architecture）是将所有功能模块集成在一个应用程序中的架构模式。整个应用程序作为一个整体进行开发、部署和运行。</p><h3 id="_2-特点" tabindex="-1"><a class="header-anchor" href="#_2-特点"><span>2. 特点</span></a></h3><ul><li><strong>开发简单</strong>：项目初期开发速度快，适合小型团队。</li><li><strong>部署方便</strong>：只需要打包成一个文件，发布到服务器即可运行。</li><li><strong>性能较高</strong>：组件之间直接调用，通信延迟低。</li><li><strong>维护困难</strong>：随着功能增多，代码规模膨胀，耦合度高，维护成本上升。</li><li><strong>扩展性差</strong>：无法按模块单独扩展，资源利用率低。</li></ul><h3 id="_3-适用场景" tabindex="-1"><a class="header-anchor" href="#_3-适用场景"><span>3. 适用场景</span></a></h3><ul><li>初创项目、功能简单、用户量较少的系统。</li><li>开发周期短，对扩展性要求不高的场景。</li></ul><hr><h2 id="二、集群架构" tabindex="-1"><a class="header-anchor" href="#二、集群架构"><span>二、集群架构</span></a></h2><h3 id="_1-概念-1" tabindex="-1"><a class="header-anchor" href="#_1-概念-1"><span>1. 概念</span></a></h3><p>集群架构（Cluster Architecture）是指将多个服务器组成一个集群，对外提供统一服务，实现负载均衡和高可用。</p><h3 id="_2-特点-1" tabindex="-1"><a class="header-anchor" href="#_2-特点-1"><span>2. 特点</span></a></h3><ul><li><strong>负载均衡</strong>：通过负载均衡器将请求分发到多个节点，提升系统吞吐量。</li><li><strong>高可用</strong>：某个节点故障时，其他节点继续提供服务，保障系统稳定性。</li><li><strong>数据一致性</strong>：需要考虑数据同步和状态保持问题。</li></ul><h3 id="_3-适用场景-1" tabindex="-1"><a class="header-anchor" href="#_3-适用场景-1"><span>3. 适用场景</span></a></h3><ul><li>高并发、高访问量的互联网应用。</li><li>需要保障系统稳定性和可用性的场景。</li></ul><hr><h2 id="三、分布式架构" tabindex="-1"><a class="header-anchor" href="#三、分布式架构"><span>三、分布式架构</span></a></h2><h3 id="_1-概念-2" tabindex="-1"><a class="header-anchor" href="#_1-概念-2"><span>1. 概念</span></a></h3><p>分布式架构（Distributed Architecture）是指将系统拆分成多个独立的服务或模块，部署在不同的服务器上，通过网络通信协作完成业务逻辑。</p><h3 id="_2-特点-2" tabindex="-1"><a class="header-anchor" href="#_2-特点-2"><span>2. 特点</span></a></h3><ul><li><strong>水平扩展</strong>：可以根据需求增加服务器，提高性能。</li><li><strong>容错性强</strong>：某个服务宕机不会影响其他服务。</li><li><strong>复杂度高</strong>：需要考虑服务间通信、数据一致性、事务处理、故障恢复等问题。</li></ul><h3 id="_3-适用场景-2" tabindex="-1"><a class="header-anchor" href="#_3-适用场景-2"><span>3. 适用场景</span></a></h3><ul><li>用户规模大、业务复杂的大型系统。</li><li>需要高可用、高扩展性的场景。</li></ul><hr><h2 id="四、soa架构" tabindex="-1"><a class="header-anchor" href="#四、soa架构"><span>四、SOA架构</span></a></h2><h3 id="_1-概念-3" tabindex="-1"><a class="header-anchor" href="#_1-概念-3"><span>1. 概念</span></a></h3><p>面向服务架构（Service-Oriented Architecture, SOA）是一种以服务为核心的架构模式，将业务功能封装成服务，通过标准接口（如HTTP、RPC等）进行通信。</p><h3 id="_2-特点-3" tabindex="-1"><a class="header-anchor" href="#_2-特点-3"><span>2. 特点</span></a></h3><ul><li><strong>服务复用</strong>：业务功能被封装成独立服务，可被多个系统调用。</li><li><strong>松耦合</strong>：服务之间独立开发、部署、升级，降低系统耦合度。</li><li><strong>性能瓶颈</strong>：由于引入了网络通信，性能可能下降。</li><li><strong>开发复杂</strong>：需要考虑服务治理、安全、事务管理等问题。</li></ul><h3 id="_3-适用场景-3" tabindex="-1"><a class="header-anchor" href="#_3-适用场景-3"><span>3. 适用场景</span></a></h3><ul><li>大型企业系统，多个业务系统需要共享核心功能。</li><li>需要灵活扩展、快速调整业务流程的场景。</li></ul><hr><h2 id="五、微服务架构" tabindex="-1"><a class="header-anchor" href="#五、微服务架构"><span>五、微服务架构</span></a></h2><h3 id="_1-概念-4" tabindex="-1"><a class="header-anchor" href="#_1-概念-4"><span>1. 概念</span></a></h3><p>微服务架构（Microservices Architecture）是SOA的进一步演进，将应用划分为粒度更小、更轻量的独立服务，每个服务完成单一业务功能，独立开发、部署、运行。</p><h3 id="_2-特点-4" tabindex="-1"><a class="header-anchor" href="#_2-特点-4"><span>2. 特点</span></a></h3><ul><li><strong>服务自治</strong>：每个服务独立开发、部署，技术栈可以不同。</li><li><strong>按需扩展</strong>：可以针对性能瓶颈的服务单独扩容。</li><li><strong>容错恢复</strong>：单个服务故障不会影响其他服务。</li><li><strong>治理成本高</strong>：需要引入服务注册发现、负载均衡、配置管理、监控、链路追踪等组件。</li></ul><h3 id="_3-适用场景-4" tabindex="-1"><a class="header-anchor" href="#_3-适用场景-4"><span>3. 适用场景</span></a></h3><ul><li>业务复杂、功能多变、需要快速交付的互联网应用。</li><li>对系统高可用、扩展性要求高的场景。</li></ul><hr><h2 id="六、架构小结" tabindex="-1"><a class="header-anchor" href="#六、架构小结"><span>六、架构小结</span></a></h2><table><thead><tr><th>特点</th><th>单体架构</th><th>集群架构</th><th>分布式架构</th><th>SOA架构</th><th>微服务架构</th></tr></thead><tbody><tr><td>开发复杂度</td><td>低</td><td>中</td><td>高</td><td>高</td><td>高</td></tr><tr><td>部署复杂度</td><td>低</td><td>中</td><td>高</td><td>高</td><td>高</td></tr><tr><td>性能</td><td>高</td><td>高</td><td>中</td><td>中</td><td>中</td></tr><tr><td>扩展性</td><td>差</td><td>中</td><td>高</td><td>高</td><td>高</td></tr><tr><td>可维护性</td><td>差</td><td>中</td><td>高</td><td>中</td><td>高</td></tr><tr><td>适用场景</td><td>小型项目</td><td>高并发</td><td>大型系统</td><td>企业系统</td><td>互联网系统</td></tr></tbody></table><p>每种架构都有其适用场景和优劣势，选择合适的架构，关键在于权衡项目规模、开发周期、运维成本和未来扩展性。</p><p>我们来捋清楚 <strong>集群</strong>、<strong>分布式</strong>、<strong>SOA</strong>、<strong>微服务</strong> 这四种架构的区别，核心是从 <strong>部署方式</strong>、<strong>服务拆分粒度</strong>、<strong>通信方式</strong>、<strong>开发运维复杂度</strong> 这几个角度来对比。</p><hr><h2 id="七、集群架构-vs-分布式架构" tabindex="-1"><a class="header-anchor" href="#七、集群架构-vs-分布式架构"><span>七、集群架构 vs 分布式架构</span></a></h2><p><strong>集群架构</strong></p><ul><li><strong>概念</strong>：多个<strong>相同</strong>的服务器节点组成集群，对外表现为一个整体。</li><li><strong>核心特点</strong>：通常提供<strong>负载均衡</strong>、<strong>高可用</strong>，但业务逻辑还是在每个节点上完整运行，不拆分功能模块。</li><li><strong>例子</strong>：一套完整的电商系统，部署多个节点，Nginx做负载均衡，任意节点都能跑完整的电商功能。</li></ul><p><strong>分布式架构</strong></p><ul><li><strong>概念</strong>：将系统拆分成多个<strong>不同功能</strong>的服务模块，部署在不同的节点上，通过网络通信协同完成业务。</li><li><strong>核心特点</strong>：每个节点负责<strong>不同</strong>的业务功能，服务之间有依赖。</li><li><strong>例子</strong>：电商系统拆成“用户服务”“订单服务”“支付服务”，每个服务独立部署在不同节点上，共同组成完整功能。</li></ul><p><strong>总结</strong>：</p><ul><li><strong>集群</strong>：每个节点是<strong>一样的完整系统</strong>，解决高并发和高可用问题；</li><li><strong>分布式</strong>：每个节点<strong>只负责一部分业务</strong>，解决系统扩展和高性能问题。</li></ul><hr><h2 id="八、soa架构-vs-微服务架构" tabindex="-1"><a class="header-anchor" href="#八、soa架构-vs-微服务架构"><span>八、SOA架构 vs 微服务架构</span></a></h2><p><strong>SOA架构（Service-Oriented Architecture）</strong></p><ul><li><strong>概念</strong>：面向服务架构，按照<strong>业务功能</strong>划分服务模块，每个服务独立运行，对外提供服务接口（如HTTP、RPC等）。</li><li><strong>核心特点</strong>：强调<strong>服务复用</strong>、<strong>松耦合</strong>，但服务粒度较大，往往一个服务承担多个功能。</li><li><strong>例子</strong>：电商系统有“订单服务”，内部包含订单创建、支付、物流状态管理等一堆功能。</li></ul><p><strong>微服务架构</strong></p><ul><li><strong>概念</strong>：微服务是SOA的进一步演进，<strong>将功能拆得更细</strong>，每个服务只完成一个小功能，独立开发、部署、运行。</li><li><strong>核心特点</strong>：每个服务更小、更轻、更灵活，技术栈也可以不同，但需要完善的服务治理体系（如注册发现、负载均衡、链路追踪等）。</li><li><strong>例子</strong>：电商系统拆得更细，“订单创建服务”“支付服务”“物流服务”“优惠券服务”全都分开，独立扩展、升级。</li></ul><p><strong>总结</strong>：</p><ul><li><strong>SOA</strong>：服务粒度大，强调<strong>复用</strong>，更适合<strong>企业级大系统</strong>；</li><li><strong>微服务</strong>：粒度小，强调<strong>灵活扩展</strong>，更适合<strong>互联网快速迭代</strong>场景。</li></ul><hr><h2 id="九、架构总结" tabindex="-1"><a class="header-anchor" href="#九、架构总结"><span>九、架构总结</span></a></h2><table><thead><tr><th>特点</th><th>集群架构</th><th>分布式架构</th><th>SOA架构</th><th>微服务架构</th></tr></thead><tbody><tr><td><strong>系统拆分方式</strong></td><td>多个完整系统</td><td>按功能拆分</td><td>按业务拆分</td><td>按更细功能拆分</td></tr><tr><td><strong>节点功能</strong></td><td>每个节点一样</td><td>每个节点不同</td><td>服务粒度较大</td><td>服务粒度更小</td></tr><tr><td><strong>通信方式</strong></td><td>内部同步通信</td><td>网络通信</td><td>HTTP/RPC等</td><td>HTTP/RESTful</td></tr><tr><td><strong>开发复杂度</strong></td><td>低</td><td>较高</td><td>高</td><td>很高</td></tr><tr><td><strong>运维难度</strong></td><td>低</td><td>较高</td><td>高</td><td>很高</td></tr><tr><td><strong>扩展性</strong></td><td>依赖负载均衡</td><td>水平扩展</td><td>灵活扩展</td><td>按需扩展每个服务</td></tr><tr><td><strong>故障影响</strong></td><td>单点故障危险</td><td>某模块故障不影响全局</td><td>某个服务故障影响较大</td><td>单个服务故障影响小</td></tr></tbody></table>',65)]))}const o=r(e,[["render",d],["__file","0_distributed.html.vue"]]),h=JSON.parse('{"path":"/distributed/0_distributed.html","title":"分布式架构","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、单体架构","slug":"一、单体架构","link":"#一、单体架构","children":[{"level":3,"title":"1. 概念","slug":"_1-概念","link":"#_1-概念","children":[]},{"level":3,"title":"2. 特点","slug":"_2-特点","link":"#_2-特点","children":[]},{"level":3,"title":"3. 适用场景","slug":"_3-适用场景","link":"#_3-适用场景","children":[]}]},{"level":2,"title":"二、集群架构","slug":"二、集群架构","link":"#二、集群架构","children":[{"level":3,"title":"1. 概念","slug":"_1-概念-1","link":"#_1-概念-1","children":[]},{"level":3,"title":"2. 特点","slug":"_2-特点-1","link":"#_2-特点-1","children":[]},{"level":3,"title":"3. 适用场景","slug":"_3-适用场景-1","link":"#_3-适用场景-1","children":[]}]},{"level":2,"title":"三、分布式架构","slug":"三、分布式架构","link":"#三、分布式架构","children":[{"level":3,"title":"1. 概念","slug":"_1-概念-2","link":"#_1-概念-2","children":[]},{"level":3,"title":"2. 特点","slug":"_2-特点-2","link":"#_2-特点-2","children":[]},{"level":3,"title":"3. 适用场景","slug":"_3-适用场景-2","link":"#_3-适用场景-2","children":[]}]},{"level":2,"title":"四、SOA架构","slug":"四、soa架构","link":"#四、soa架构","children":[{"level":3,"title":"1. 概念","slug":"_1-概念-3","link":"#_1-概念-3","children":[]},{"level":3,"title":"2. 特点","slug":"_2-特点-3","link":"#_2-特点-3","children":[]},{"level":3,"title":"3. 适用场景","slug":"_3-适用场景-3","link":"#_3-适用场景-3","children":[]}]},{"level":2,"title":"五、微服务架构","slug":"五、微服务架构","link":"#五、微服务架构","children":[{"level":3,"title":"1. 概念","slug":"_1-概念-4","link":"#_1-概念-4","children":[]},{"level":3,"title":"2. 特点","slug":"_2-特点-4","link":"#_2-特点-4","children":[]},{"level":3,"title":"3. 适用场景","slug":"_3-适用场景-4","link":"#_3-适用场景-4","children":[]}]},{"level":2,"title":"六、架构小结","slug":"六、架构小结","link":"#六、架构小结","children":[]},{"level":2,"title":"七、集群架构 vs 分布式架构","slug":"七、集群架构-vs-分布式架构","link":"#七、集群架构-vs-分布式架构","children":[]},{"level":2,"title":"八、SOA架构 vs 微服务架构","slug":"八、soa架构-vs-微服务架构","link":"#八、soa架构-vs-微服务架构","children":[]},{"level":2,"title":"九、架构总结","slug":"九、架构总结","link":"#九、架构总结","children":[]}],"git":{"updatedTime":1743344190000,"contributors":[{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":5,"url":"https://github.com/Clarence"},{"name":"hanchen","username":"hanchen","email":"1154937362@qq.com","commits":1,"url":"https://github.com/hanchen"},{"name":"hello0709","username":"hello0709","email":"1154937362@qq.com","commits":1,"url":"https://github.com/hello0709"}]},"filePathRelative":"distributed/0_distributed.md"}');export{o as comp,h as data};
