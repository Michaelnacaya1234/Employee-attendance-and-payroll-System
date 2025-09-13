/**
 * ADMIN NAVIGATION DROPDOWN MANAGER
 * Handles employee, attendance, and request navigation dropdowns
 * Provides smooth animations and outside-click behavior
 */
(function(){
  /**
   * WIRE EMPLOYEE DROPDOWN NAVIGATION
   * Sets up click handlers and keyboard navigation for employee submenu
   * Maintains state and handles outside clicks
   */
  function wireEmpDropdown(){
    try {
      var toggle = document.getElementById('nav-employees-toggle');
      var sub = document.getElementById('nav-employees-sub');
      var caret = document.getElementById('nav-employees-caret');
      var wrap = document.getElementById('nav-employees-wrap');
      if (!toggle || !sub || !wrap) return false;

      var setExpanded = function(expanded){
        try { toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false'); } catch {}
        // caret rotation disabled
      };

      if (!toggle.__empMenuWired){
        toggle.__empMenuWired = true;
        toggle.addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          var willOpen = sub.classList.contains('hidden');
          smoothToggleSub(sub, willOpen, caret, toggle);
          // Track manual close/open
          try {
            if (wrap) {
              if (willOpen) { delete wrap.dataset.userClosed; }
              else { wrap.dataset.userClosed = '1'; }
            }
          } catch(e){}
        });
        toggle.addEventListener('keydown', function(e){
          var k = e.key || e.keyCode;
          if (k === 'Enter' || k === ' ' || k === 13 || k === 32){
            e.preventDefault();
            toggle.click();
          }
        });
      }

      if (!window.__empMenuOutsideClose){
        window.__empMenuOutsideClose = true;
        document.addEventListener('click', function(ev){
          if (!wrap.contains(ev.target)){
            // Keep submenu open if a child link is the active page
            var hasActiveChild = false;
            try { hasActiveChild = !!(sub && sub.querySelector('a.nav-active')); } catch(e){}
            if (!hasActiveChild && !sub.classList.contains('hidden')){
              smoothToggleSub(sub, false, caret, toggle);
              // Mark as user-closed to prevent auto reopen
              try { if (wrap) wrap.dataset.userClosed = '1'; } catch(e){}
            }
          }
        });
      }
      return true;
    } catch(e){ return false; }
  }

  /**
   * WIRE ATTENDANCE DROPDOWN NAVIGATION
   * Configures attendance submenu with interaction handlers
   * Includes auto-close on outside clicks and active state detection
   */
  function wireAttendanceDropdown(){
    try {
      var toggle = document.getElementById('nav-attendance-toggle');
      var sub = document.getElementById('nav-attendance-sub');
      var caret = document.getElementById('nav-attendance-caret');
      var wrap = document.getElementById('nav-attendance-wrap');
      if (!toggle || !sub || !wrap) return false;

      var setExpanded = function(expanded){
        try { toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false'); } catch {}
        // caret rotation disabled
      };

      if (!toggle.__attMenuWired){
        toggle.__attMenuWired = true;
        toggle.addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          var willOpen = sub.classList.contains('hidden');
          smoothToggleSub(sub, willOpen, caret, toggle);
          // Track manual close to prevent auto reopen
          try {
            if (wrap) {
              if (willOpen) { delete wrap.dataset.userClosed; }
              else { wrap.dataset.userClosed = '1'; }
            }
          } catch(e){}
        });
        toggle.addEventListener('keydown', function(e){
          var k = e.key || e.keyCode;
          if (k === 'Enter' || k === ' ' || k === 13 || k === 32){
            e.preventDefault();
            toggle.click();
          }
        });
      }

      if (!window.__attMenuOutsideClose){
        window.__attMenuOutsideClose = true;
        document.addEventListener('click', function(ev){
          if (!wrap.contains(ev.target)){
            var hasActiveChild = false;
            try { hasActiveChild = !!(sub && sub.querySelector('a.nav-active')); } catch(e){}
            if (!hasActiveChild && !sub.classList.contains('hidden')){
              smoothToggleSub(sub, false, caret, toggle);
              // Mark as user-closed to prevent auto reopen
              try { if (wrap) wrap.dataset.userClosed = '1'; } catch(e){}
            }
          }
        });
      }
      return true;
    } catch(e){ return false; }
  }

  /**
   * WIRE REQUESTS DROPDOWN NAVIGATION
   * Sets up request submenu with full interaction support
   * Tracks user preferences for open/close state
   */
  function wireRequestsDropdown(){
    try {
      var toggle = document.getElementById('nav-requests-toggle');
      var sub = document.getElementById('nav-requests-sub');
      var caret = document.getElementById('nav-requests-caret');
      var wrap = document.getElementById('nav-requests-wrap');
      if (!toggle || !sub || !wrap) return false;

      var setExpanded = function(expanded){
        try { toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false'); } catch {}
        // caret rotation disabled
      };

      if (!toggle.__reqMenuWired){
        toggle.__reqMenuWired = true;
        toggle.addEventListener('click', function(e){
          e.preventDefault();
          e.stopPropagation();
          var willOpen = sub.classList.contains('hidden');
          smoothToggleSub(sub, willOpen, caret, toggle);
          // Track manual close/open for Request dropdown
          try {
            if (wrap) {
              if (willOpen) { delete wrap.dataset.userClosed; }
              else { wrap.dataset.userClosed = '1'; }
            }
          } catch(e){}
        });
        toggle.addEventListener('keydown', function(e){
          var k = e.key || e.keyCode;
          if (k === 'Enter' || k === ' ' || k === 13 || k === 32){
            e.preventDefault();
            toggle.click();
          }
        });
      }

      if (!window.__reqMenuOutsideClose){
        window.__reqMenuOutsideClose = true;
        document.addEventListener('click', function(ev){
          if (!wrap.contains(ev.target)){
            var hasActiveChild = false;
            try { hasActiveChild = !!(sub && sub.querySelector('a.nav-active')); } catch(e){}
            if (!hasActiveChild && !sub.classList.contains('hidden')){
              smoothToggleSub(sub, false, caret, toggle);
              // Mark as user-closed to prevent auto reopen
              try { if (wrap) wrap.dataset.userClosed = '1'; } catch(e){}
            }
          }
        });
      }
      return true;
    } catch(e){ return false; }
  }

  /**
   * ENSURE NAVIGATION ACTIVE STYLING
   * Injects CSS for active navigation link appearance
   * Maintains consistent styling across admin pages
   */
  function ensureNavActiveStyle(){
    try {
      if (document.getElementById('nav-active-style')) return;
      var style = document.createElement('style');
      style.id = 'nav-active-style';
      // Active link text color unified across pages (matches text-primary-100/90)
      style.textContent = 'aside nav a.nav-active{color:rgba(219,234,254,0.9) !important;}';
      document.head.appendChild(style);
    } catch(e){}
  }

  /**
   * SMOOTH SUBMENU TOGGLE ANIMATION
   * Provides animated open/close transitions for navigation submenus
   * Handles rapid toggles and maintains smooth user experience
   */
  function smoothToggleSub(sub, open, caret, toggle){
    if (!sub) return;

    // Cancel any ongoing animation
    if (sub.__animEnd) {
      try { sub.removeEventListener('transitionend', sub.__animEnd); } catch(e){}
      sub.__animEnd = null;
    }
    if (sub.__animRAF) { try { cancelAnimationFrame(sub.__animRAF); } catch(e){} sub.__animRAF = null; }

    // Compute start/end states
    const isHidden = sub.classList.contains('hidden');
    const startOpen = !isHidden && (sub.style.maxHeight === '' || sub.style.maxHeight === 'none');

    // Ensure transitional styles
    sub.style.overflow = 'hidden';
    sub.style.willChange = 'max-height, opacity';

    const clean = (finalOpen) => {
      sub.style.transition = '';
      sub.style.maxHeight = finalOpen ? '' : '';
      sub.style.opacity = '';
      sub.style.overflow = '';
      sub.style.willChange = '';
      if (!finalOpen) sub.classList.add('hidden');
    };

    const onEnd = function(ev){
      if (ev && ev.propertyName && ev.propertyName !== 'max-height') return;
      sub.removeEventListener('transitionend', onEnd);
      sub.__animEnd = null;
      clean(open);
    };
    sub.__animEnd = onEnd;

    if (open){
      // Opening
      sub.classList.remove('hidden');
      // set start
      sub.style.opacity = '0';
      sub.style.maxHeight = '0px';
      sub.__animRAF = requestAnimationFrame(() => {
        sub.style.transition = 'max-height 220ms ease, opacity 180ms ease';
        sub.style.maxHeight = sub.scrollHeight + 'px';
        sub.style.opacity = '1';
      });
      try { toggle && toggle.setAttribute('aria-expanded','true'); } catch(e){}
      // caret rotation disabled
    } else {
      // Closing
      // from current natural height
      if (startOpen) {
        sub.style.maxHeight = sub.scrollHeight + 'px';
      }
      sub.__animRAF = requestAnimationFrame(() => {
        sub.style.transition = 'max-height 220ms ease, opacity 180ms ease';
        // Force reflow for reliability
        void sub.offsetHeight;
        sub.style.maxHeight = '0px';
        sub.style.opacity = '0';
      });
      try { toggle && toggle.setAttribute('aria-expanded','false'); } catch(e){}
      // caret rotation disabled
    }

    sub.addEventListener('transitionend', onEnd);
  }

  function highlightActiveNav(){
    try {
      ensureNavActiveStyle();
      var links = document.querySelectorAll('aside nav a[href]');
      var active = null;
      try {
        var toggleBtn = document.getElementById('nav-employees-toggle');
        if (toggleBtn) {
          toggleBtn.classList.remove('nav-parent-active');
          toggleBtn.classList.remove('text-gray-300');
        }
      } catch(e){}
      links.forEach(function(a){
        try {
          a.classList.remove('nav-active');
          var url = new URL(a.getAttribute('href'), location.href);
          if (url.pathname === location.pathname){
            if (!url.hash || url.hash === location.hash){ active = a; }
          }
        } catch(e){}
      });
      if (active){
        active.classList.add('nav-active');
        // Employees submenu
        var subEmp = document.getElementById('nav-employees-sub');
        if (subEmp && subEmp.contains(active)){
          var wrapEmp = document.getElementById('nav-employees-wrap');
          var closedByUserEmp = false;
          try { closedByUserEmp = !!(wrapEmp && wrapEmp.dataset && wrapEmp.dataset.userClosed === '1'); } catch(e){}
          if (!closedByUserEmp){
            var tEmp = document.getElementById('nav-employees-toggle');
            var cEmp = document.getElementById('nav-employees-caret');
            if (!subEmp.dataset.autoOpened) {
              smoothToggleSub(subEmp, true, cEmp, tEmp);
              subEmp.dataset.autoOpened = '1';
            } else {
              subEmp.classList.remove('hidden');
              try { tEmp && tEmp.setAttribute('aria-expanded','true'); } catch(e){}
            }
            if (tEmp) tEmp.classList.add('text-gray-300');
            // caret rotation disabled
          }
        } else {
          // Navigated away; clear manual-close flag so it can auto-open next time
          try { var wrapEmp2 = document.getElementById('nav-employees-wrap'); if (wrapEmp2 && wrapEmp2.dataset) delete wrapEmp2.dataset.userClosed; } catch(e){}
        }
        // Attendance submenu
        var subAtt = document.getElementById('nav-attendance-sub');
        if (subAtt && subAtt.contains(active)){
          var wrapAtt = document.getElementById('nav-attendance-wrap');
          var closedByUser = false;
          try { closedByUser = !!(wrapAtt && wrapAtt.dataset && wrapAtt.dataset.userClosed === '1'); } catch(e){}
          if (!closedByUser){
            var tAtt = document.getElementById('nav-attendance-toggle');
            var cAtt = document.getElementById('nav-attendance-caret');
            if (!subAtt.dataset.autoOpened) {
              smoothToggleSub(subAtt, true, cAtt, tAtt);
              subAtt.dataset.autoOpened = '1';
            } else {
              subAtt.classList.remove('hidden');
              try { tAtt && tAtt.setAttribute('aria-expanded','true'); } catch(e){}
            }
            if (tAtt) tAtt.classList.add('text-gray-300');
            // caret rotation disabled
          }
        } else {
          // Navigated away; clear manual-close flag so it can auto-open next time
          try { var wrapAtt2 = document.getElementById('nav-attendance-wrap'); if (wrapAtt2 && wrapAtt2.dataset) delete wrapAtt2.dataset.userClosed; } catch(e){}
        }
        // Request submenu
        var subReq = document.getElementById('nav-requests-sub');
        if (subReq && subReq.contains(active)){
          var wrapReq = document.getElementById('nav-requests-wrap');
          var closedByUserReq = false;
          try { closedByUserReq = !!(wrapReq && wrapReq.dataset && wrapReq.dataset.userClosed === '1'); } catch(e){}
          if (!closedByUserReq){
            var tReq = document.getElementById('nav-requests-toggle');
            var cReq = document.getElementById('nav-requests-caret');
            if (!subReq.dataset.autoOpened) {
              smoothToggleSub(subReq, true, cReq, tReq);
              subReq.dataset.autoOpened = '1';
            } else {
              subReq.classList.remove('hidden');
              try { tReq && tReq.setAttribute('aria-expanded','true'); } catch(e){}
            }
            if (tReq) tReq.classList.add('text-gray-300');
            // caret rotation disabled
          }
        } else {
          // Navigated away; clear manual-close flag so it can auto-open next time
          try { var wrapReq2 = document.getElementById('nav-requests-wrap'); if (wrapReq2 && wrapReq2.dataset) delete wrapReq2.dataset.userClosed; } catch(e){}
        }
      }
    } catch(e){}
  }

  function init(){
    highlightActiveNav();
    try { window.addEventListener('hashchange', highlightActiveNav); } catch(e){}
    var tryWireAll = function(){ var a = wireEmpDropdown(); var b = wireAttendanceDropdown(); var c = wireRequestsDropdown(); return a && b && c; };
    if (tryWireAll()) return;
    var tries = 0, max = 10;
    var iv = setInterval(function(){
      tries++;
      highlightActiveNav();
      if (tryWireAll() || tries >= max) clearInterval(iv);
    }, 200);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
