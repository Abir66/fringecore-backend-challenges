// ALL YOUR CODE SHOULD BE HERE
// DO NOT EDIT THE OTHER FILES
import net from "node:net";

const server = net.createServer();

const secret = "ilikebigtrainsandicantlie";

function replaceSecret(data, pointers) {
  let dataArray = data.split("");

  for (let pointer = 0; pointer < pointers.length; pointer++) {
    let [start, end] = pointers[pointer];
    for (let i = start; i <= end; i++) {
        if (dataArray[i] !== '\n' && dataArray[i] !== ' ') {
            dataArray[i] = '-';
        }
    }
  }
  return dataArray.join(""); 
}

// Knuth-Morris-Pratt Algorithm --------------------------------------------
function prefix(p) {
  let m = p.length;
  let pi = new Array(m);
  pi[0] = 0;
  let k = 0;

  for (let q = 1; q < m; q++) {
      while (k > 0 && p[k] !== p[q]) {
          k = pi[k - 1];
      }
      if (p[k] === p[q]) {
          k++;
      }
      pi[q] = k;
  }
  return pi;
}


function kmp(t,p){
  let n = t.length;
  let m = p.length;
  let pi = prefix(p);
  let q = 0;
  let res = [];
  let start = -1, end = 0;
  for (let i = 0; i < n; i++) {

      if(t[i] === '\n' || t[i] === ' ') continue;

      while (q > 0 && p[q] !== t[i]) {
          q = pi[q - 1];
          start = -1;
      }

      if (p[q] === t[i]) {
          if(start === -1) start = i;
          q++;
      }
      
      if (q === m) {
          end = i;
          q = 0; // don't need overlap matches
          res.push([start,end]);
          start = -1;
      }
  }

  return [res, start];
}

// --------------------------------------------------------------------------

function processData(data) {
  
  let [pointers, partialMatch] = kmp(data, secret);
  
  let firstPart = data, secondPart = "";

  if(partialMatch !== -1){
    firstPart = data.substring(0, partialMatch); // processed
    secondPart = data.substring(partialMatch); // partial match
  }


  if(pointers.length != 0) firstPart = replaceSecret(firstPart, pointers);
  return [firstPart, secondPart];
}

server.on("connection", (conn) => {
  
  const remoteConnection = net.createConnection({ port: 3032 }, () => {
    console.log("Connected to server on port 3032");
    remoteConnection.write("a");
  });

  let remainder = "", processedData = "";

  // Forward data from the remote server (3032) to the client
  remoteConnection.on("data", (data) => {
    [processedData, remainder] = processData(remainder + data);
    conn.write(processedData);
  });

  // Handle closing the connection with the remote server
  remoteConnection.on("close", () => {
    console.log("Connection to server on port 3032 closed");
    conn.end();
  });

  remoteConnection.on("error", (error) => {
    console.error("Error with connection to server on port 3032:", error);
    conn.end();
  });
  

  conn.on("close", () => {
    console.log("closed")
    remoteConnection.end();
  });

  conn.on("error", (error) => {
    console.error(error);
  });
});

const port = parseInt(process.env.PORT ?? "3031");

server.listen(port, () => {
  console.log(`STARTED SERVER 0.0.0.0:${port}`);
});
