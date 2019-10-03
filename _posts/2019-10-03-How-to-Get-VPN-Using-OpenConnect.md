---
layout: post
title: "How to Get VPN Using OpenConnect"
---

# 什么是OpenConnect？

> OpenConnect is an open-source software application for connecting to virtual private networks (VPN), which implement secure point-to-point connections.

OpenConnect就是一个提供VPN网络，支持安全的点对点连接的开源软件。

如果你对OpenConnect的实现原理感兴趣，可以看看github上的[Openconnect VPN Poject](https://github.com/openconnect)。

# 搭建原理介绍

首先，你需要一个装有Linux操作系统的VPS，并且能够ping通。这里使用的是Ubuntu-16.04的环境。

如果你还没有VPS，可以到国外一些提供VPS资源的网站购买，这里推荐[vultr](https://vultr.com)。

![vultr](https://2hj4ig.dm.files.1drv.com/y4maf35HLNaQyalZSFiFd_O4jsDhhjYmBnD4e6V99hIcxvtv-S-D3BvubQYxVYWy2NeC6zcAS6De9fvRlwZXykVP-lPB1ym5cTJbxmCvkhkxBHN0ZiNoumFK8FF35HfraJjkLXXW-NTBhSNfBSkpljawSsnCMhDmD29aNNvA6TwSaRh81dlST70_iGbuQ2FovKLzcrUH7yR7uU996pSCwyGpw?width=1920&height=989&cropmode=none)

## Ocserv

OpenConnect server(ocserv) is a VPN server that connects through SSL. It is a secure, lightweight and fast connect server that can be installed on Linux environment. It follows the openconnect protocol and is believed to be compatible with CISCO's AnyConnect SSL VPN.

Ocserv运行在Linux环境，安全、轻量、快速，通过SSL安全连接，并且使用openconnect协议，兼容CISCO's AnyConnect SSL VPN。

## Cisco AnyConnect Client

> When a user opens a VPN session using Cisco AnyConnect, the AnyConnect
> client connects to the adaptive security appliance using SSL. The client
> authenticates with the adaptive security appliance and is assigned an internal IP
> address on the network.

用户通过Cisco AnyConnect Client使用SSL访问VPN，连接成功后赋予一个内网ip。

# 具体搭建步骤

## server部分

**注意：以下步骤需要root权限**

1. 更新apt源

```bash
sudo apt-get update
```

2. 安装OCServ

```bash
sudo apt-get install ocserv
```
3. 安装GnuTLS

这一步是为了生成密钥 (key) 和证书 (certificate)。

```bash
sudo apt-get install gnutls-bin
```

4. 生成密钥和证书

进入OCServ的安装目录，创建证书授权模板ca.tmpl。

```bash
cd /etc/ocserv
sudo vim ca.tmpl
```
```bash
cn = "example"  # 证书名称：随便写
organization = "example"  # 组织：随便写
serial = 1
expiration_days = 3650
ca
signing_key
cert_signing_key
crl_signing_key
```

保存退出后，使用以下命令生成ca的私钥和证书。

```bash
# 生成ca的私钥
sudo certtool --generate-privkey --outfile ca-key.pem
# 通过ca的私钥和模板生成证书
sudo certtool --generate-self-signed --load-privkey ca-key.pem --template ca.tmpl --outfile ca-cert.pem
```

同样地，创建服务模板server.tmpl。

```bash
sudo vim server.tmpl
```
```bash
cn = "x.x.x.x"  # 当前服务器的ip地址
organization = "example"  # 组织：随便写
expiration_days = 3650
signing_key
encryption_key
tls_www_server
```

保存退出后，使用以下命令生成server的私钥和证书。

```bash
# 生成server的私钥
sudo certtool --generate-privkey --outfile server-key.pem
# 通过server的私钥和模板，以及ca的私钥和证书，生成server的证书
sudo certtool --generate-certificate --load-privkey server-key.pem --load-ca-certificate ca-cert.pem --load-ca-privkey ca-key.pem --template server.tmpl --outfile server-cert.pem
```

5. 配置ocserv.conf

```bash
sudo vim ocserv.conf
```

找到以下内容：

```bash
auth = "pam[gid-min=1000]"
server-cert = /etc/ssl/certs/ssl-cert-snakeoil.pem
server-key = /etc/ssl/private/ssl-cert-snakeoil.key
try-mtu-discovery = false
dns = 192.168.1.2
```

分别替换成：

```bash
auth = "plain[/etc/ocserv/ocpasswd]"
server-cert = /etc/ocserv/server-cert.pem
server-key = /etc/ocserv/server-key.pem
try-mtu-discovery = true
dns = 8.8.8.8
```

并且注释掉下面几行：

```bash
route = 10.10.10.0/255.255.255.0
route = 192.168.0.0/255.255.0.0
no-route = 192.168.5.0/255.255.255.0
```

保存退出。

6. 创建账号密码

```bash
sudo ocpasswd -c /etc/ocserv/ocpasswd <username>  # 这里写用户名
```

7. 更改系统配置允许转发

```bash
sudo vim /etc/sysctl.conf
```

去掉 net.ipv4.ip_forward=1 前面的注释

```bash
net.ipv4.ip_forward=1
```

保存退出，并激活此次修改

```bash
sudo sysctl -p
```

8. 端口开放允许连接

```bash
# 开放443端口允许tcp连接
sudo iptables -A INPUT -p tcp –dport 443 -j ACCEPT
# 开放443端口允许udp连接
sudo iptables -A INPUT -p udp –dport 443 -j ACCEPT
```

使得NAT生效

```bash
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
```

9. 运行ocserv

首先查看是否有socket占用443端口

```bash
systemctl -all list-sockets
```

![list-sockets](https://33iblw.dm.files.1drv.com/y4msW4Ws19c5u9M6U-uEbVxCduXaBXKBfi7qFd71NzKCMeqHXUxAwxSy8Ed68FCsJkU9N-EiaHYRHd-jTPrDBwC1q_DWut5Tf7Mvqj1dWxiYGLDj4n5yiBgi7rujVYmHxzc6XtfFfTUMCkzCmJbVLKek8RcjRWhdnAFiGrtZUk6Gu2wlDkY2XVYbbJaNDlAfRw7OxEM7t-GN3Ctc2RbrugOTQ?width=784&height=39&cropmode=none)

若有，如上图所示，则先stop

```bash
sudo systemctl stop ocserv.socket
```

接着使用修改过的ocserv.conf配置重新start

```bash
sudo ocserv -c /etc/ocserv/ocserv.conf
```

然后查看server是否在443端口正常运行

```bash
sudo netstat -tulpn | grep 443
```

## client部分

1. 下载并安装AnyConnect Client

[Cisco-AnyConnect-Client-win-4.5](https://onedrive.live.com/embed?cid=96A2E372C7844E9A&resid=96A2E372C7844E9A%2121900&authkey=APkPhS1ijjKfhKo)

2. 配置好服务器的ip地址

![client-disconnected](https://33ielw.dm.files.1drv.com/y4mtTdQZwP4MRF92vCuzVh1LatDwFqYYb0bILNfkQcsjEYnagtneXjTI5tTlJ8-nebyJeMi_xC8rBNFa0NvKswbjkSlmkgFa5sdWC82xA2Op70GABqQ_a84_5fvkci38oPO-al_FZW_0Z1YZzWPRvc1HDyd4NehXs1w7rzLXGiGRLjiFKYArC-Ynx_IKv8XEFLHlu6mFg6dJ6eSm06BzS6yeQ?width=503&height=239&cropmode=none)

3. 通过用户名和密码连接服务器

**注意：若提示证书不信任，则选择connect anyway**

输入用户名和密码

![client-username](https://33ixlw.dm.files.1drv.com/y4mzG71kIc6THkUAy2mKOFldLtzrgvrkydvp7x5FNTpB0SDe_bi27byPC3Q2mV9oVpUbyTdpwCmfud4zU-SLwoaox4ex-U7H5zX-8c37YLNy91jmxElxQRSJfR80T0KtIyEICVP-5j5wLkDeBsJ1EZ0abc7UgCfJyrUGUaFcF6Xbq-qGlkBAX3hSXCApXCNbyn0cpXL9KPNtjh1sBd0WGA2Rg?width=427&height=207&cropmode=none)

![client-password](https://33iylw.dm.files.1drv.com/y4m5QGgn852rn25d6GDc0_wrFVqXICf0Lep7EQIWKHcs_yTuMhY_5_tfq24yCEF_2U2DXfGr30YQbUkkzd5SycPJ6ZSbIWSp91S6W0Fx5gG-cvmTj7ygQx82zgX6TWTR2NfzUN8PRdP0eC5IwVB2oVlF4mOcyNCXS5O3Z82RRSDUrIEKPnUxxmLVDyQBlfuIliGNzrUw7KgFtnVZqSDBsH4Qw?width=425&height=207&cropmode=none)

连接成功

![client-connected](https://33idlw.dm.files.1drv.com/y4mca4-lFnk7yRLD7PxinUAqeqFvZ9tpAMGsKeeCv98W3AUfxQH65eV2M_b5unKjjwqsY-BVQUdnFNkhMEhLMSmuugtdY4ipaUxjQrta-SlK3H4Q5Td7YstYQfKmNj3LvQi96SMFCEqiQuYX7ahRIeH_BR5oD2y3q0AJTSwJ_M_OXcP_CNQ8ZB3Q6N9caLe7AqjonqrRpzkvQJ0KawQSavT-A?width=503&height=239&cropmode=none)

## 测试

查看当前的ip地址，访问[whatismyipaddress](https://whatismyipaddress.com/)

![ip](https://33ialw.dm.files.1drv.com/y4mggg_00i5i3v7T4_TIe8zwAObpvU13KPVKyB5YyTxwg7XnV_LZ4fktIDGwCUofuTsP1H_cEEpochvbpj55ICKViY4ayMFWHa84P6xvPHlUGxcizyCLo1Im546TMTXhrf_DfdA4var57vR7P4yhRo0XKFL2OzQ8TmJr5rBnzIpzIf0EP5yjzhY8r3gf4Rd-5NwUop8eHzzmosGngNRW-c9kw?width=1893&height=987&cropmode=none)

可以看到，ip地址是服务器的地址，则VPN运行成功！