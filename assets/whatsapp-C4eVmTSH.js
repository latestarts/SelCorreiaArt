const $="+15197029537",r=n=>`${window.location.origin}/SelCorreiaArt/#/product/${n}`;function d(n,o,e){return`Hello, I want to order:
${n.map(t=>{const i=Number(t.price.replace(/[^0-9.]/g,"")),c=t.discount?i*t.discount/100:0,u=i-c,a=t.quantity||1;return`${t.name} (Qty: ${a}) - $${(u*a).toFixed(2)}
Link: ${r(t.id)}`}).join(`

`)}

Customization notes: 

Total: $${o.toFixed(2)}${e>0?` (You saved: $${e.toFixed(2)})`:""}`}function g(n,o=1){const e=o>0?o:1,s=`Hi, I'm interested in buying or customizing: ${n.name} (Quantity: ${e})
Customization notes: 
Link: ${r(n.id)}`;return`https://wa.me/${$}?text=${encodeURIComponent(s)}`}export{g as a,d as g};
