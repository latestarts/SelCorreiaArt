function d(e,o,t){const s=`${window.location.origin}/SelCorreiaArt/#`;return`Hello, I want to order:
${e.map(n=>{const a=parseFloat(n.price.replace(/[^0-9.]/g,"")),r=n.discount?a*n.discount/100:0,c=a-r,i=n.quantity||1;return`${n.name} (Qty: ${i}) - $${(c*i).toFixed(2)}
Link: ${s}/product/${n.id}`}).join(`

`)}

Total: $${o.toFixed(2)} ${t>0?`(You saved: $${t.toFixed(2)})`:""}`}function u(e,o=1){const t=`${window.location.origin}/SelCorreiaArt/#`,s=`Hi, I'm interested in buying: ${e.name} (Quantity: ${o})
Link: ${t}/product/${e.id}`;return`https://wa.me/+15197029537?text=${encodeURIComponent(s)}`}export{u as a,d as g};
