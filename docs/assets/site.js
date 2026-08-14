(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const params=new URLSearchParams(location.search);
  const base=location.pathname.endsWith('/course.html')||location.pathname.endsWith('course.html')?'':'./';
  fetch(base+'courses/catalog.json').then(r=>{if(!r.ok)throw Error('Không tải được danh mục');return r.json()}).then(init).catch(e=>{const el=document.querySelector('#course-grid,#markdown');if(el)el.innerHTML=`<p>${esc(e.message)}. Hãy chạy website qua HTTP.</p>`});

  function init(data){document.getElementById('course-grid')?catalog(data.courses):reader(data.courses)}
  function catalog(courses){
    const grid=document.getElementById('course-grid'),input=document.getElementById('search');
    const render=()=>{const q=input.value.toLocaleLowerCase('vi');const rows=courses.filter(c=>c.title.toLocaleLowerCase('vi').includes(q));grid.innerHTML=rows.map((c,i)=>`<article class="course-card"><span class="num">NODE ${(i+1).toString().padStart(2,'0')}</span><h3>${esc(c.title)}</h3><p>${c.lessonCount} bài · Lesson → Presentation → Exercise → Code → Project</p><a href="course.html?course=${encodeURIComponent(c.id)}">ENTER COURSE ↗</a></article>`).join('')||'<p>Không tìm thấy khóa học phù hợp.</p>'};
    input.addEventListener('input',render);render();
  }
  function reader(courses){
    const course=courses.find(c=>c.id===params.get('course'))||courses[0];if(!course)return;
    const requested=params.get('doc'),selected=course.documents.find(d=>d.path===requested)||course.documents[0];
    document.getElementById('course-title').textContent=course.title;document.getElementById('file-name').textContent=selected.path;document.getElementById('doc-code').textContent='DOC://'+selected.path.split('/').pop().toUpperCase();document.title=selected.title+' · AI Learn';
    const select=document.getElementById('doc-select');let kind='';
    course.documents.forEach(doc=>{if(doc.kind!==kind){kind=doc.kind;const group=document.createElement('optgroup');group.label=kind;select.appendChild(group)}const option=document.createElement('option');option.value=doc.path;option.textContent=doc.title;option.selected=doc.path===selected.path;select.lastElementChild.appendChild(option)});
    select.addEventListener('change',()=>location.href=`?course=${encodeURIComponent(course.id)}&doc=${encodeURIComponent(select.value)}`);
    const firstByKind=new Map();course.documents.forEach(doc=>{if(!firstByKind.has(doc.kind))firstByKind.set(doc.kind,doc)});
    document.getElementById('resource-nav').innerHTML=[...firstByKind].map(([group,doc],i)=>`<a class="${selected.kind===group?'active':''}" href="?course=${encodeURIComponent(course.id)}&doc=${encodeURIComponent(doc.path)}"><b>0${i+1}</b><span>${esc(group.replace(/^\d+\.\s*/,''))}</span></a>`).join('');
    document.getElementById('copy-link').addEventListener('click',async e=>{await navigator.clipboard.writeText(location.href);e.currentTarget.firstChild.textContent='COPIED ';});
    loadDocument(selected);
    addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;document.getElementById('reading-progress').style.width=(max?scrollY/max*100:0)+'%'},{passive:true});
  }
  function loadDocument(doc){fetch(base+doc.path).then(r=>{if(!r.ok)throw Error('Không tải được tài liệu');return r.text()}).then(text=>{const root=document.getElementById('markdown');root.innerHTML=doc.format==='md'?markdown(text,doc.path):codeDocument(text,doc);enhance(root)}).catch(e=>document.getElementById('markdown').innerHTML=`<p>${esc(e.message)}</p>`)}
  function enhance(root){
    const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
    root.querySelectorAll('h1,h2,h3').forEach((h,i)=>h.id=slug(h.textContent)||'section-'+i);
    root.querySelectorAll('blockquote').forEach(b=>{if(/\[!warning\]|cảnh báo/i.test(b.textContent)){b.classList.add('warning');b.innerHTML=b.innerHTML.replace(/\[!WARNING\]/i,'')}});
    const headings=[...root.querySelectorAll('h2,h3')];document.getElementById('toc').innerHTML='<p class="label">// ON THIS PAGE</p>'+headings.map(h=>`<a class="${h.tagName==='H3'?'subheading':''}" href="#${h.id}">${esc(h.textContent)}</a>`).join('');
    const h2s=[...root.querySelectorAll(':scope > h2')];h2s.forEach(h=>{const section=document.createElement('section');section.className='doc-section';h.parentNode.insertBefore(section,h);let node=h;while(node&&(!node.nextSibling||node===h||node.tagName!=='H2')){const next=node.nextSibling;section.appendChild(node);node=next;if(node&&node.tagName==='H2')break}});
  }
  function codeDocument(source,doc){return `<h1>${esc(doc.title)}</h1><h2>4. Code · ${esc((doc.format||'text').toUpperCase())}</h2><pre><code class="language-${esc(doc.format||'text')}">${esc(source)}</code></pre>`}
  function markdown(md,path){
    const dir=path.slice(0,path.lastIndexOf('/')+1);let code=[];
    md=md.replace(/```([\w+-]*)\n([\s\S]*?)```/g,(_,lang,src)=>`@@CODE${code.push(`<pre><code class="language-${esc(lang)}">${esc(src)}</code></pre>`)-1}@@`);
    const lines=md.split('\n'),out=[];let list='',table=false;
    const closeList=()=>{if(list){out.push(`</${list}>`);list=''}};
    const inline=s=>esc(s).replace(/!\[([^\]]*)\]\(([^)]+)\)/g,(_,a,u)=>`<img alt="${a}" src="${/^(https?:|\/)/.test(u)?u:dir+u}">`).replace(/\[([^\]]+)\]\(([^)]+)\)/g,(_,a,u)=>`<a href="${u.endsWith('.md')?'course.html?course='+encodeURIComponent(params.get('course'))+'&doc='+encodeURIComponent(dir+u):u}">${a}</a>`).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/\*([^*]+)\*/g,'<em>$1</em>');
    for(let i=0;i<lines.length;i++){let l=lines[i];if(/^@@CODE\d+@@$/.test(l)){closeList();out.push(l);continue}if(/^\|.+\|\s*$/.test(l)&&i+1<lines.length&&/^\|?\s*:?-+/.test(lines[i+1])){closeList();const heads=l.split('|').slice(1,-1);out.push('<table><thead><tr>'+heads.map(x=>`<th>${inline(x.trim())}</th>`).join('')+'</tr></thead><tbody>');table=true;i++;continue}if(table&&/^\|.+\|\s*$/.test(l)){out.push('<tr>'+l.split('|').slice(1,-1).map(x=>`<td>${inline(x.trim())}</td>`).join('')+'</tr>');continue}if(table){out.push('</tbody></table>');table=false}const h=l.match(/^(#{1,4})\s+(.+)/);if(h){closeList();out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`)}else if(/^[-*]\s+/.test(l)){if(list!=='ul'){closeList();out.push('<ul>');list='ul'}out.push(`<li>${inline(l.replace(/^[-*]\s+/,''))}</li>`)}else if(/^\d+\.\s+/.test(l)){if(list!=='ol'){closeList();out.push('<ol>');list='ol'}out.push(`<li>${inline(l.replace(/^\d+\.\s+/,''))}</li>`)}else if(/^>\s?/.test(l)){closeList();out.push(`<blockquote><p>${inline(l.replace(/^>\s?/,''))}</p></blockquote>`)}else if(/^---+$/.test(l.trim())){closeList();out.push('<hr>')}else if(l.trim()){closeList();out.push(`<p>${inline(l)}</p>`)}else closeList()}
    closeList();if(table)out.push('</tbody></table>');return out.join('\n').replace(/@@CODE(\d+)@@/g,(_,n)=>code[+n]);
  }
})();
