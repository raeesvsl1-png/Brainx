/**
 * brainX - Interactive Web Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initCRTMode();
  initPromptDemo();
  initConstellationNodes();
  initSlackSimulator();
  initFAQAccordion();
  initModalLogic();
});

/* ==========================================================================
   1. CRT Mode Toggle
   ========================================================================== */
function initCRTMode() {
  const crtNavBtn = document.getElementById('crt-toggle-nav');
  const crtFooterBtn = document.getElementById('crt-toggle-footer');

  const savedMode = localStorage.getItem('brainx:crt');
  const isCRTOn = savedMode === 'on';

  updateCRTState(isCRTOn);

  function toggleCRT() {
    const currentState = document.body.classList.contains('crt-mode-active');
    const newState = !currentState;
    localStorage.setItem('brainx:crt', newState ? 'on' : 'off');
    updateCRTState(newState);
  }

  function updateCRTState(isOn) {
    if (isOn) {
      document.body.classList.add('crt-mode-active');
      if (crtNavBtn) crtNavBtn.classList.add('active');
      if (crtFooterBtn) crtFooterBtn.classList.add('active');
      if (crtNavBtn) crtNavBtn.setAttribute('aria-checked', 'true');
      if (crtFooterBtn) crtFooterBtn.setAttribute('aria-checked', 'true');
    } else {
      document.body.classList.remove('crt-mode-active');
      if (crtNavBtn) crtNavBtn.classList.remove('active');
      if (crtFooterBtn) crtFooterBtn.classList.remove('active');
      if (crtNavBtn) crtNavBtn.setAttribute('aria-checked', 'false');
      if (crtFooterBtn) crtFooterBtn.setAttribute('aria-checked', 'false');
    }
  }

  if (crtNavBtn) crtNavBtn.addEventListener('click', toggleCRT);
  if (crtFooterBtn) crtFooterBtn.addEventListener('click', toggleCRT);
}

/* ==========================================================================
   2. Interactive Prompt Switcher Demo
   ========================================================================== */
const PROMPTS_DATA = {
  "1": {
    text: "We just shipped dark mode. Make some noise about it this week.",
    actionTitle: "LAUNCH PUSH",
    steps: [
      { text: "7-tweet launch thread drafted", meta: "X · TUE 9:00 AM", done: true },
      { text: '"Designing dark mode" blog outlined', meta: "WRITER · REVIEW", done: true },
      { text: "3 threads found in r/webdev", meta: "REDDIT · REPLIES DRAFTED", done: true },
      { text: "Monitoring mentions + replies", meta: "RECURRING · 24/7", done: false }
    ]
  },
  "2": {
    text: "Get us cited when people ask ChatGPT about marketing automation.",
    actionTitle: "GEO OPTIMIZATION",
    steps: [
      { text: "Crawled top 15 Perplexity AI marketing queries", meta: "GEO · COMPLETE", done: true },
      { text: "Structured comparison data schema injected", meta: "SEO · DEPLOYED", done: true },
      { text: "Authoritative article published on Dev.to", meta: "WRITER · LIVE", done: true },
      { text: "AI citation index tracking active", meta: "ANALYTICS · 24/7", done: false }
    ]
  },
  "3": {
    text: "Find 5 creators in the dev-tools niche and start conversations.",
    actionTitle: "CREATOR OUTREACH",
    steps: [
      { text: "Identified 5 relevant YouTube & X tech creators", meta: "INFLUENCER · MATCHED", done: true },
      { text: "Custom personalized pitch DMs generated", meta: "WRITER · DRAFTED", done: true },
      { text: "Outreach sequence scheduled", meta: "X · THU 10:00 AM", done: true },
      { text: "Response monitoring & auto-triage enabled", meta: "RECURRING · ACTIVE", done: false }
    ]
  }
};

function initPromptDemo() {
  const tabs = document.querySelectorAll('.demo-tab');
  const promptTextDisplay = document.getElementById('prompt-display-text');
  const actionTitleDisplay = document.getElementById('agent-action-title');
  const stepsListDisplay = document.getElementById('agent-steps-list');

  function loadPrompt(promptId) {
    const data = PROMPTS_DATA[promptId];
    if (!data) return;

    // Update Tab UI
    tabs.forEach(tab => {
      if (tab.dataset.prompt === promptId) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // Update Prompt Text
    if (promptTextDisplay) {
      promptTextDisplay.innerHTML = `<span class="prompt-prefix">›</span> ${data.text}`;
    }

    // Update Action Title
    if (actionTitleDisplay) {
      actionTitleDisplay.textContent = data.actionTitle;
    }

    // Update Steps List
    if (stepsListDisplay) {
      stepsListDisplay.innerHTML = data.steps.map(step => `
        <div class="demo-step">
          <div class="demo-step-label">
            <span class="${step.done ? 'accent-text' : 'comment-text'}">${step.done ? '✓' : '◌'}</span>
            ${step.text}
          </div>
          <span class="demo-step-meta">${step.meta}</span>
        </div>
      `).join('');
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      loadPrompt(tab.dataset.prompt);
    });
  });

  // Initial Load Prompt 1
  loadPrompt("1");
}

/* ==========================================================================
   3. 8-Agent Constellation Diagram Interactions
   ========================================================================== */
function initConstellationNodes() {
  const satelliteNodes = document.querySelectorAll('.satellite-node');
  const infoTag = document.querySelector('.info-tag');
  const infoContent = document.getElementById('agent-info-content');
  const centerNode = document.getElementById('cmo-center-node');

  satelliteNodes.forEach(node => {
    const agentName = node.dataset.agent;
    const agentRole = node.dataset.role;

    node.addEventListener('mouseenter', () => {
      if (infoTag) infoTag.textContent = agentName.toUpperCase();
      if (infoContent) infoContent.textContent = agentRole;
    });

    node.addEventListener('mouseleave', () => {
      if (infoTag) infoTag.textContent = "HOVER AN AGENT";
      if (infoContent) infoContent.textContent = "Hover over any specialist agent to inspect its marketing scope and automation capability.";
    });
  });

  if (centerNode) {
    centerNode.addEventListener('mouseenter', () => {
      if (infoTag) infoTag.textContent = "BRAINX AI CMO";
      if (infoContent) infoContent.textContent = "Orchestrates all 8 channel specialists, sets strategy, delegates tasks, and requests your sign-off.";
    });
    centerNode.addEventListener('mouseleave', () => {
      if (infoTag) infoTag.textContent = "HOVER AN AGENT";
      if (infoContent) infoContent.textContent = "Hover over any specialist agent to inspect its marketing scope and automation capability.";
    });
  }
}

/* ==========================================================================
   4. Slack Simulator Actions
   ========================================================================== */
function initSlackSimulator() {
  const btnApprove = document.getElementById('slack-btn-approve');
  const btnReview = document.getElementById('slack-btn-review');
  const feedbackMsg = document.getElementById('slack-feedback-msg');

  if (btnApprove) {
    btnApprove.addEventListener('click', () => {
      if (feedbackMsg) {
        feedbackMsg.textContent = "✓ Approved! brainX is now publishing launch thread & deploying SEO brief.";
        feedbackMsg.style.color = "var(--accent)";
      }
    });
  }

  if (btnReview) {
    btnReview.addEventListener('click', () => {
      if (feedbackMsg) {
        feedbackMsg.textContent = "ℹ Opening individual draft review modal in Slack thread...";
        feedbackMsg.style.color = "#9fbfa8";
      }
    });
  }
}

/* ==========================================================================
   5. FAQ Accordion Toggle
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const icon = item.querySelector('.faq-icon');

    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const trg = i.querySelector('.faq-trigger');
          const icn = i.querySelector('.faq-icon');
          if (trg) trg.setAttribute('aria-expanded', 'false');
          if (icn) icn.textContent = '+';
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });
}

/* ==========================================================================
   6. Early Access Modal Window
   ========================================================================== */
function initModalLogic() {
  const modalBackdrop = document.getElementById('modal-early-access');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const form = document.getElementById('early-access-form');
  const successMsg = document.getElementById('form-success-msg');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  function openModal(e) {
    if (e) e.preventDefault();
    if (modalBackdrop) {
      modalBackdrop.classList.add('active');
      modalBackdrop.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      modalBackdrop.setAttribute('aria-hidden', 'true');
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.hidden = true;
      if (successMsg) successMsg.hidden = false;
    });
  }

  if (btnCloseSuccess) {
    btnCloseSuccess.addEventListener('click', () => {
      closeModal();
      setTimeout(() => {
        if (form) {
          form.reset();
          form.hidden = false;
        }
        if (successMsg) successMsg.hidden = true;
      }, 300);
    });
  }
}
