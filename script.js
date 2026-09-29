const S=[...document.querySelectorAll('.slide')];let cur=0;
function show(i){cur=Math.max(0,Math.min(S.length-1,i));S.forEach((s,k)=>s.classList.toggle('on',k==cur));
 document.getElementById('bar').style.width=(cur+1)/S.length*100+'%';document.getElementById('pg').textContent=(cur+1)+' / '+S.length;scrollTo(0,0);if(cur==7)boom()}
function go(d){show(cur+d)}
addEventListener('keydown',e=>{if(e.key=='ArrowRight'||e.key==' ')go(1);if(e.key=='ArrowLeft')go(-1)});
const f=n=>String(n).replace('-','−');
function G(id,lines,pts){let s='';
 for(let i=-6;i<=6;i++){s+=`<line x1="${180+i*30}" y1="0" x2="${180+i*30}" y2="360" stroke="var(--grid)"/><line x1="0" y1="${180+i*30}" x2="360" y2="${180+i*30}" stroke="var(--grid)"/>`}
 s+='<line x1="0" y1="180" x2="360" y2="180" stroke="var(--ax)" stroke-width="2"/><line x1="180" y1="0" x2="180" y2="360" stroke="var(--ax)" stroke-width="2"/><text x="346" y="196" fill="var(--sub)" font-size="13">x</text><text x="188" y="14" fill="var(--sub)" font-size="13">y</text>';
 lines.forEach(l=>{s+=`<line x1="0" y1="${180-(l.a*-6+l.b)*30}" x2="360" y2="${180-(l.a*6+l.b)*30}" stroke="${l.c}" stroke-width="${l.w||4}" stroke-linecap="round" ${l.d?'stroke-dasharray="8 6"':''}/>`+(l.r?`<text x="-14" y="8" font-size="26"><animateMotion dur="3.5s" repeatCount="indefinite" path="M0,${180-(l.a*-6+l.b)*30} L360,${180-(l.a*6+l.b)*30}"/>${l.r}</text>`:'')});
 pts.forEach(p=>{s+=`<circle cx="${180+p[0]*30}" cy="${180-p[1]*30}" r="7" fill="${p[2]||'var(--c4)'}" stroke="#fff" stroke-width="2"/><text x="${180+p[0]*30+9}" y="${180-p[1]*30-9}" font-size="12" font-weight="700" fill="var(--tx)">(${f(p[0])},${f(p[1])})</text>`});
 document.getElementById(id).innerHTML=s}
const C={1:{a:2,b:1,c:'var(--c1)'},2:{a:-2,b:3,c:'var(--c2)'}},X=[-2,-1,0,1,2],n={1:0,2:0};
function draw(k){const{a,b,c}=C[k],m=n[k];
 let t='<table><tr><th>x</th>'+X.map((x,i)=>`<th>${f(x)}</th>`).join('')+'</tr><tr><th>y</th>'+X.map((x,i)=>`<td class="${i==m-1?'hl':''}">${i<m?f(a*x+b):'?'}</td>`).join('')+'</tr></table>';
 document.getElementById('t'+k).innerHTML=t;
 G('g'+k,m>5?[{a,b,c}]:[],X.slice(0,Math.min(m,5)).map(x=>[x,a*x+b,c]))}
function st(k){n[k]=Math.min(6,n[k]+1);draw(k)}function rs(k){n[k]=0;draw(k)}draw(1);draw(2);
const s3=document.getElementById('s3');
function d3(){const b=+s3.value;document.getElementById('e3').textContent='y = 2x '+(b<0?'− '+(-b):'+ '+b);
 document.getElementById('t3').innerHTML='<tr><th>x</th>'+X.map(x=>`<th>${f(x)}</th>`).join('')+'</tr><tr><th>2x</th>'+X.map(x=>`<td>${f(2*x)}</td>`).join('')+'</tr><tr><th>2x+b</th>'+X.map(x=>`<td style="color:var(--c2);font-weight:800">${f(2*x+b)}</td>`).join('')+'</tr>';
 document.getElementById('m3').textContent=b==0?'원래 y=2x 그대로':`y축 방향으로 ${f(b)}만큼 평행이동`;
 G('g3',[{a:2,b:0,c:'var(--c1)',d:1},{a:2,b:b,c:'var(--c2)',r:'🚀'}],[[0,b,'var(--c2)']])}
s3.oninput=d3;d3();
let t4=0;function two(k){t4=k;G('g4',k>2?[{a:-2,b:1,c:'var(--c2)'}]:[],[...(k>0?[[0,1,'var(--c3)']]:[]),...(k>1?[[1,-1,'var(--c2)']]:[])])}two(0);
const a5=document.getElementById('a5'),b5=document.getElementById('b5');
function d5(){const a=+a5.value,b=+b5.value;document.getElementById('e5').textContent='y = '+(a==1?'':a==-1?'−':f(a))+'x '+(b<0?'− '+(-b):'+ '+b);
 document.getElementById('pa').textContent='기울기 '+f(a)+(a>0?' ↗':a<0?' ↘':' →');document.getElementById('pb').textContent='y절편 '+f(b);
 G('g5',[{a,b,c:'var(--c1)',r:'🚴'}],[[0,b,'var(--c3)']])}
a5.oninput=b5.oninput=d5;d5();
function quiz(id,opts,ans){const d=document.getElementById(id);opts.forEach((o,i)=>{const b=document.createElement('button');b.className='o';b.textContent=o;
 b.onclick=()=>{const fb=d.nextElementSibling;const ok=i==ans;b.className=ok?'ok':'no';if(ok)boom();fb.textContent=ok?'🎉 정답!':'다시 생각해 볼까요?'};d.appendChild(b)})}
quiz('q1',['−2','2','3','−3'],0);quiz('q2',['(0, 4)','(0, −4)','(4, 4)','(1, 4)'],0);quiz('q3',['y=2x+3','y=2x+4','y=5x+1','y=2x−2'],1);
function boom(){for(let i=0;i<36;i++){const e=document.createElement('span');e.className='cf';e.textContent=['🎉','⭐','📈','✨','🔷','🟣'][i%6];e.style.left=Math.random()*100+'vw';e.style.animationDuration=1.8+Math.random()*1.8+'s';e.style.fontSize=16+Math.random()*22+'px';document.body.appendChild(e);setTimeout(()=>e.remove(),3800)}}
show(0);
