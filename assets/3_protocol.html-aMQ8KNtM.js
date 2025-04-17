import{_ as e,c as l,a,o as r}from"./app-jfSBanKl.js";const o={};function i(n,t){return r(),l("div",null,t[0]||(t[0]=[a('<h1 id="iot-传输协议" tabindex="-1"><a class="header-anchor" href="#iot-传输协议"><span>IoT 传输协议</span></a></h1><p>在物联网（IoT）中，设备之间的通信对带宽、能耗、实时性有较高要求，因此需要使用轻量级、低功耗的通信协议。常见的传输协议包括 MQTT、CoAP、HTTP、AMQP、LoRaWAN 等，其中 MQTT 和 CoAP 是应用最广泛的两种。</p><hr><h2 id="一、mqtt" tabindex="-1"><a class="header-anchor" href="#一、mqtt"><span>一、MQTT</span></a></h2><p>英文全称：Message Queuing Telemetry Transport</p><h3 id="_1、简介" tabindex="-1"><a class="header-anchor" href="#_1、简介"><span>1、简介</span></a></h3><p>MQTT 是一种轻量级的<strong>发布/订阅模型</strong>的通信协议，特别适用于低带宽、高延迟或不稳定的网络环境。由 IBM 开发，后成为 OASIS 标准。</p><h3 id="_2、特点" tabindex="-1"><a class="header-anchor" href="#_2、特点"><span>2、特点</span></a></h3><ul><li>基于 TCP 协议传输</li><li>使用 <strong>发布/订阅（Pub/Sub）</strong> 模型，解耦客户端</li><li>支持 QoS（服务质量）等级：0（最多一次）、1（至少一次）、2（只有一次）</li><li>适合资源受限设备（如传感器、边缘设备）</li><li>保持会话（Keep Alive）机制可提升稳定性</li></ul><h3 id="_3、应用场景" tabindex="-1"><a class="header-anchor" href="#_3、应用场景"><span>3、应用场景</span></a></h3><ul><li>智能家居（如小米米家、阿里天猫精灵）</li><li>远程设备监控</li><li>智慧农业 / 智慧城市</li></ul><h3 id="_4、开源-broker" tabindex="-1"><a class="header-anchor" href="#_4、开源-broker"><span>4、开源 Broker</span></a></h3><ol><li><p><strong>EMQX（推荐）</strong></p><ul><li>高性能、企业级 MQTT Broker</li><li>支持 MQTT 3.1.1、5.0，支持集群、桥接、安全认证</li><li>Web 管理界面 + 插件化架构</li><li>官网：<a href="https://www.emqx.io" target="_blank" rel="noopener noreferrer">https://www.emqx.io</a></li></ul></li><li><p><strong>Mosquitto</strong></p><ul><li>Eclipse 基金会项目，体积小，适合嵌入式部署</li><li>支持 MQTT 3.1 和 3.1.1，简单易用</li><li>缺点：功能比较基础，适合轻量使用</li><li>官网：<a href="https://mosquitto.org" target="_blank" rel="noopener noreferrer">https://mosquitto.org</a></li></ul></li><li><p><strong>VerneMQ</strong></p><ul><li>Erlang 编写，支持分布式和高并发连接</li><li>适合大规模部署和弹性扩展</li><li>支持 MQTT 5、插件开发、桥接等</li></ul></li><li><p><strong>HiveMQ</strong></p><ul><li>商业版本功能强大，也提供开源版本</li><li>提供可视化管理、MQTT 5 支持好</li><li>适合工业和企业级应用</li></ul></li></ol><hr><h2 id="coap" tabindex="-1"><a class="header-anchor" href="#coap"><span>CoAP</span></a></h2><p>英文全称：Constrained Application Protocol</p><h3 id="_1、简介-1" tabindex="-1"><a class="header-anchor" href="#_1、简介-1"><span>1、简介</span></a></h3><p>CoAP 是为 IoT 设计的基于 REST 架构的协议，由 IETF 设计，运行于 UDP 之上。它是 HTTP 的简化版，更适合受限设备和低功耗通信环境。</p><h3 id="_2、特点-1" tabindex="-1"><a class="header-anchor" href="#_2、特点-1"><span>2、特点</span></a></h3><ul><li>基于 UDP（更轻量）</li><li>类似 HTTP 的资源路径模型（GET/POST/PUT/DELETE）</li><li>支持可选的可靠性（使用 ACK、重传机制）</li><li>支持多播、Observe（观察）机制</li><li>消息结构更小，适用于低带宽网络</li></ul><h3 id="_3、应用场景-1" tabindex="-1"><a class="header-anchor" href="#_3、应用场景-1"><span>3、应用场景</span></a></h3><ul><li>微控制器设备（如 STM32、ESP8266）</li><li>局域网内的 IoT 网络</li><li>低功耗广域网（如 NB-IoT）</li></ul><h3 id="_4、开源-coap-server" tabindex="-1"><a class="header-anchor" href="#_4、开源-coap-server"><span>4、开源 CoAP Server</span></a></h3><h4 id="_1-eclipse-californium-java-🔥推荐" tabindex="-1"><a class="header-anchor" href="#_1-eclipse-californium-java-🔥推荐"><span>1. <strong>Eclipse Californium（Java）🔥推荐</strong></span></a></h4><ul><li>支持完整 CoAP 协议（RFC 7252、Observe、Block、DTLS 等）</li><li>丰富的 API 和插件机制</li><li>可用于搭建独立的 CoAP Server 或作为边缘网关嵌入 Java 应用</li></ul><p>📌 示例项目：使用 Californium 搭建一个接收 <code>/sensors/temperature</code> 数据的服务端。</p><p>项目地址：<a href="https://github.com/eclipse/californium" target="_blank" rel="noopener noreferrer">https://github.com/eclipse/californium</a></p><hr><h4 id="_2-libcoap-c" tabindex="-1"><a class="header-anchor" href="#_2-libcoap-c"><span>2. <strong>libcoap（C）</strong></span></a></h4><ul><li>轻量级 CoAP 实现，专为嵌入式设备设计</li><li>支持 UDP、DTLS、TCP 等传输层</li><li>可运行在裸机/RTOS 上</li></ul><p>项目地址：<a href="https://github.com/obgm/libcoap" target="_blank" rel="noopener noreferrer">https://github.com/obgm/libcoap</a></p><p>适合场景：在 STM32 或 ESP32 这类 MCU 上直接构建 CoAP 服务。</p><hr><h4 id="_3-aiocoap-python-3" tabindex="-1"><a class="header-anchor" href="#_3-aiocoap-python-3"><span>3. <strong>aiocoap（Python 3）</strong></span></a></h4><ul><li>基于 <code>asyncio</code> 的现代 CoAP 实现</li><li>适合快速开发和原型验证</li><li>支持 Observe、Blockwise、DTLS（可选）</li></ul><p>项目地址：<a href="https://github.com/chrysn/aiocoap" target="_blank" rel="noopener noreferrer">https://github.com/chrysn/aiocoap</a></p><p>适合场景：需要快速构建 Python 后台服务处理 IoT 设备数据。</p><hr><h4 id="_4-node-coap-node-js" tabindex="-1"><a class="header-anchor" href="#_4-node-coap-node-js"><span>4. <strong>node-coap（Node.js）</strong></span></a></h4><ul><li>简洁的 Node.js 实现，支持 GET/PUT/POST/DELETE</li><li>API 设计类似 Express.js</li></ul><p>项目地址：<a href="https://github.com/mcollina/node-coap" target="_blank" rel="noopener noreferrer">https://github.com/mcollina/node-coap</a></p><p>适合场景：Node.js 全栈项目或边缘控制中心。</p><h4 id="coap总结" tabindex="-1"><a class="header-anchor" href="#coap总结"><span>CoAP总结</span></a></h4><table><thead><tr><th>项目</th><th>语言</th><th>特点</th><th>推荐场景</th></tr></thead><tbody><tr><td><strong>Californium</strong></td><td>Java</td><td>功能最全，企业级可用</td><td>云平台/边缘网关</td></tr><tr><td><strong>libcoap</strong></td><td>C</td><td>极致轻量，适合嵌入式</td><td>MCU、RTOS</td></tr><tr><td><strong>aiocoap</strong></td><td>Python</td><td>上手快，适合原型开发</td><td>教学、PoC</td></tr><tr><td><strong>node-coap</strong></td><td>JS</td><td>快速开发、IoT 原型</td><td>Node 全栈</td></tr></tbody></table><h2 id="三、mqtt-vs-coap-对比" tabindex="-1"><a class="header-anchor" href="#三、mqtt-vs-coap-对比"><span>三、MQTT vs CoAP 对比</span></a></h2><table><thead><tr><th>特性</th><th>MQTT</th><th>CoAP</th></tr></thead><tbody><tr><td>协议类型</td><td>发布/订阅</td><td>请求/响应（类 HTTP）</td></tr><tr><td>传输协议</td><td>TCP</td><td>UDP</td></tr><tr><td>可靠性</td><td>高，支持 QoS</td><td>轻量，支持重传但不强制可靠性</td></tr><tr><td>消息大小</td><td>中</td><td>小（适合低带宽）</td></tr><tr><td>编程模型</td><td>异步</td><td>同步/异步（支持观察）</td></tr><tr><td>支持多播</td><td>不支持</td><td>支持</td></tr><tr><td>适用场景</td><td>需要稳定连接、状态保留</td><td>网络不稳定、对功耗敏感</td></tr></tbody></table>',46)]))}const d=e(o,[["render",i],["__file","3_protocol.html.vue"]]),h=JSON.parse('{"path":"/iot/3_protocol.html","title":"IoT 传输协议","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"一、MQTT","slug":"一、mqtt","link":"#一、mqtt","children":[{"level":3,"title":"1、简介","slug":"_1、简介","link":"#_1、简介","children":[]},{"level":3,"title":"2、特点","slug":"_2、特点","link":"#_2、特点","children":[]},{"level":3,"title":"3、应用场景","slug":"_3、应用场景","link":"#_3、应用场景","children":[]},{"level":3,"title":"4、开源 Broker","slug":"_4、开源-broker","link":"#_4、开源-broker","children":[]}]},{"level":2,"title":"CoAP","slug":"coap","link":"#coap","children":[{"level":3,"title":"1、简介","slug":"_1、简介-1","link":"#_1、简介-1","children":[]},{"level":3,"title":"2、特点","slug":"_2、特点-1","link":"#_2、特点-1","children":[]},{"level":3,"title":"3、应用场景","slug":"_3、应用场景-1","link":"#_3、应用场景-1","children":[]},{"level":3,"title":"4、开源 CoAP Server","slug":"_4、开源-coap-server","link":"#_4、开源-coap-server","children":[]}]},{"level":2,"title":"三、MQTT vs CoAP 对比","slug":"三、mqtt-vs-coap-对比","link":"#三、mqtt-vs-coap-对比","children":[]}],"git":{"updatedTime":1744903564000,"contributors":[{"name":"hello0709","username":"hello0709","email":"1154937362@qq.com","commits":1,"url":"https://github.com/hello0709"},{"name":"Clarence","username":"Clarence","email":"1154937362@qq.com","commits":2,"url":"https://github.com/Clarence"}]},"filePathRelative":"iot/3_protocol.md"}');export{d as comp,h as data};
