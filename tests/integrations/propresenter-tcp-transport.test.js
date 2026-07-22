import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import {
  ProPresenterTcpTransport
} from "../../packages/integrations/src/propresenter/index.js";

test("uses newline-delimited JSON for a real TCP request", async t => {
  const server = net.createServer(socket => {
    socket.setEncoding("utf8");
    socket.once("data", chunk => {
      const request = JSON.parse(chunk.trim());
      assert.equal(request.url, "v1/timer/system_time");
      socket.write(
        `${JSON.stringify({
          url: request.url,
          data: 1721367787
        })}\r\n`
      );
    });
  });

  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());

  const address = server.address();
  const transport = new ProPresenterTcpTransport({
    host: "127.0.0.1",
    port: address.port
  });

  await transport.connect();
  const response = await transport.request({
    url: "v1/timer/system_time"
  });

  assert.equal(response.data, 1721367787);
  await transport.disconnect();
});

test("receives chunked streaming messages", async t => {
  const server = net.createServer(socket => {
    socket.setEncoding("utf8");
    socket.once("data", chunk => {
      const request = JSON.parse(chunk.trim());
      assert.equal(request.chunked, true);
      socket.write(`${JSON.stringify({ url: request.url, data: 1 })}\r\n`);
      socket.write(`${JSON.stringify({ url: request.url, data: 2 })}\r\n`);
    });
  });

  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  t.after(() => server.close());

  const address = server.address();
  const transport = new ProPresenterTcpTransport({
    host: "127.0.0.1",
    port: address.port
  });

  const values = [];
  transport.on("message", message => values.push(message.data));

  await transport.connect();
  await transport.subscribe("v1/timer/system_time");
  await new Promise(resolve => setTimeout(resolve, 40));

  assert.deepEqual(values, [1, 2]);
  await transport.disconnect();
});
