import assert from "node:assert/strict";
import { loadTypeScript } from "./load-ts.mjs";
const { readDemoResponse, sendDemoRequest } = await loadTypeScript("app/lib/demo-request.ts");
assert.equal(readDemoResponse({success:true,messageId:"smtp-id"}), "accepted");
for (const body of [null, {}, "OK", {success:true}, {success:true,messageId:""}, {success:false,messageId:"id"}, {success:"true",messageId:"id"}, {success:true,message:"Form successfully submitted."}]) assert.throws(() => readDemoResponse(body));
const fields = {name:"Prueba local",service:"aula_lista_ia",email:"test@example.invalid"};
let calls = 0;
assert.equal(await sendDemoRequest(fields, async (url, options) => {
  calls++;
  assert.equal(url, "/api/contacto/");
  assert.equal(options.method, "POST");
  assert.equal(options.credentials, "same-origin");
  assert.deepEqual(JSON.parse(options.body), fields);
  return Response.json({success:true,messageId:"smtp-id"});
}), "accepted");
assert.equal(calls, 1);
for (const response of [new Response("error",{status:502}),new Response("limited",{status:429}),new Response("<html>not JSON</html>"),Response.json({success:false})]) await assert.rejects(sendDemoRequest(fields, async()=>response));
await assert.rejects(sendDemoRequest(fields,async()=>{throw new TypeError("Network unavailable");}));
await assert.rejects(sendDemoRequest(fields,async(_,options)=>new Promise((resolve,reject)=>{
 options.signal.addEventListener("abort",()=>reject(new DOMException("Timeout","AbortError")),{once:true});
}),10),{name:"AbortError"});
console.log("Client verified: same-origin API, explicit SMTP acknowledgement, HTTP failures, malformed JSON, network and timeout.");
