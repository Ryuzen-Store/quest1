/**
 * Navigation coordinator: the mobile menu drawer, toggle wiring, and
 * route-change side effects (close menu, scroll to top, aria state).
 * The bottom-nav rendering lives in components/navigation.js.
 */

import * as navUI from './components/navigation.js';
import { renderHeader } from './components/header.js';

let host = null;
let drawerListenersAttached = false;

function ensureHost() {
  if (host) return host;
  host = document.getElementById('app-nav');
  if (!host) {
    host = document.createElement('div');
    host.id = 'app-nav';
    host.className = 'app-nav';
    const appRoot = document.getElementById('app');
    if (appRoot) appRoot.appendChild(host);
    else document.body.appendChild(host);
  }
  return host;
}

/** Initialize navigation (toggle + drawer) once. */
export function initNavigation(getAuthState, onRouteChange) {
  ensureHost();
  const toggle = document.getElementById('nav-toggle');

  if (toggle && !drawerListenersAttached) {
    drawerListenersAttached = true;
    toggle.addEventListener('click', () => {
      const open = host.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  let lastPath = '';
  window.addEventListener('hashchange', () => {
    const path = currentPathSlug();
    if (path !== lastPath) {
      lastPath = path;
      closeDrawer();
      window.scrollTo({ top: 0, behavior: 'auto' });
      if (onRouteChange) onRouteChange(path);
    }
  });
  lastPath = currentPathSlug();
  closeDrawer();
}

export function closeDrawer() {
  if (!host) return;
  host.classList.remove('is-open');
  const toggle = document.getElementById('nav-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

export function refreshNavigation(getAuthState) {
  ensureHost();
  navUI.renderBottomNav(getAuthState);
  // Re-render header so the admin link reflects the current role.
  renderHeader(getAuthState);
}

export function currentPathSlug() {
  const h = window.location.hash || '#/';
  return h.startsWith('#') ? h.slice(1) : h;
}

export default { initNavigation, closeDrawer, refreshNavigation, currentPathSlug };
