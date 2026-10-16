// Mobile navigation, subtle reveal animation, and interactive skill categories.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');

      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.textContent = isOpen ? '×' : '☰';
    });

    nav.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.textContent = '☰';
      })
    );
  }

  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // Ensure content is visible when reduced motion is enabled.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const skillData = {
    bi: {
      icon: '▥',
      title: 'BI & Visualization',
      description: 'Transforming metrics into readable, decision-focused dashboards and reports.',
      skills: [
        'Power BI',
        'DAX',
        'Dashboard Design',
        'Data Visualization',
        'Excel Reporting'
      ]
    },

    data: {
      icon: '⌘',
      title: 'Data & Querying',
      description: 'Preparing, querying, and shaping data for consistent analysis.',
      skills: [
        'SQL',
        'Microsoft SQL Server',
        'Power Query',
        'M Language',
        'Excel',
        'Python (Pandas — foundational)'
      ]
    },

    workflow: {
      icon: '✓',
      title: 'Workflow & Quality',
      description: 'Improving the reliability of reporting through clear processes and repeatable checks.',
      skills: [
        'Data Cleaning',
        'Data Validation',
        'Data Quality',
        'Requirements Gathering',
        'Process Improvement',
        'Operational Reporting'
      ]
    },

    people: {
      icon: '↗',
      title: 'Collaboration',
      description: 'Working with stakeholders to clarify questions and communicate useful findings.',
      skills: [
        'Stakeholder Management',
        'Communication',
        'Presentation',
        'Problem Solving',
        'Cross-functional Collaboration',
        'Attention to Detail'
      ]
    }
  };

  const tabs = document.querySelectorAll('.skill-tab');
  const panel = document.getElementById('skill-panel');

  function showSkills(key) {
    const item = skillData[key];

    if (!item || !panel) return;

    tabs.forEach(tab => {
      const active = tab.dataset.skill === key;

      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    panel.innerHTML = `
      <div class="skill-panel-icon">${item.icon}</div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="skill-chips">
          ${item.skills.map(skill => `<span>${skill}</span>`).join('')}
        </div>
      </div>
    `;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      showSkills(tab.dataset.skill);
    });
  });

  tabs.forEach(tab => {
    tab.setAttribute(
      'aria-selected',
      String(tab.classList.contains('active'))
    );
  });
});
