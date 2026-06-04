const projectData = [
  {
    id: "blog",
    title: "Personal Blog",
    tags: ["HTML", "CSS", "JS", "Flask", "AWS"],
    category: "web",
    description: "A personal blog that runs on Flask and Vanilla JavaScript. It features Obsidian-style backlinks, custom tags, user comments, automatic mood tracking metrics, and dynamic server-side content parsing.",
    image: "assets/project-previews/blog.png",
    links: [
      { label: "GitHub Repo", url: "https://github.com/jesse-proj" },
      { label: "Live Website", url: "#" }
    ]
  },
  {
    id: "newnote",
    title: "Newnote Text Editor",
    tags: ["Python", "Tkinter"],
    category: "desktop",
    description: "A lightweight and distraction-free desktop text editor built with Python and Tkinter, featuring custom syntax highlighting profiles, file auto-saves, and multiple customizable retro themes.",
    image: "assets/project-previews/newnote.png",
    links: [
      { label: "GitHub Repo", url: "https://github.com/jesse-proj" }
    ]
  },
  {
    id: "anatomy",
    title: "Anatomy Explorer",
    tags: ["HTML", "CSS", "JS", "Flask", "PythonAnywhere"],
    category: "web",
    description: "An interactive anatomical quiz web application designed to help medical students study skeletal structures, hosted on PythonAnywhere and utilizing a lightweight Flask backend.",
    image: "assets/project-previews/anatomy-explorer.png",
    links: [
      { label: "Live Demo", url: "#" }
    ]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const gridContainer = document.querySelector('#projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Render project list
  function renderProjects(filter = 'all') {
    gridContainer.innerHTML = '';
    
    const filtered = filter === 'all' 
      ? projectData 
      : projectData.filter(p => p.category === filter);

    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'window project-card-window reveal active enlarge-on-hover';
      card.setAttribute('data-id', p.id);

      // Header/Title bar styling matching the retro theme
      const titleBar = document.createElement('div');
      titleBar.className = 'window-title';
      titleBar.innerHTML = `<p>${p.title}</p>`;
      card.appendChild(titleBar);

      const content = document.createElement('div');
      content.className = 'window-content flex-col flex-space-between full-height';
      
      const cardBody = document.createElement('div');
      cardBody.className = 'project-card-body';
      cardBody.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p class='small-text text-justify'>${p.description}</p>
      `;
      content.appendChild(cardBody);

      const footerSection = document.createElement('div');
      footerSection.className = 'flex-col flex-gap-1';
      footerSection.style.marginTop = '1rem';

      const tagsDiv = document.createElement('div');
      tagsDiv.className = 'tag-container';
      p.tags.forEach(tag => {
        tagsDiv.innerHTML += `<p>${tag}</p>`;
      });
      footerSection.appendChild(tagsDiv);

      const linksDiv = document.createElement('div');
      linksDiv.className = 'project-links';
      linksDiv.style.marginTop = '0.5rem';
      linksDiv.style.display = 'flex';
      linksDiv.style.gap = '0.5rem';
      linksDiv.style.flexWrap = 'wrap';
      p.links.forEach(link => {
        linksDiv.innerHTML += `<a href="${link.url}" class="no-decor-link" target="_blank" style="display: inline-block; background: #cd90b9; color: black; padding: 0.3rem 0.8rem; border-radius: 4px; font-weight: bold; font-size: 0.8rem; text-align: center; text-decoration: none;">${link.label}</a>`;
      });
      footerSection.appendChild(linksDiv);

      content.appendChild(footerSection);
      card.appendChild(content);
      gridContainer.appendChild(card);
    });
  }

  // Handle Filtering
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.getAttribute('data-filter'));
    });
  });

  // Initialize
  renderProjects();
});
