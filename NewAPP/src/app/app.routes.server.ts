import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Match the full nested route used by the router: /dashboard/curds/AddEdit/:Id
    path: 'dashboard/curds/AddEdit/:Id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const idsToPrerender = ['1', '2', '3']; // Example IDs to prerender
      return idsToPrerender.map(id => ({ Id: id }));
    }
  },

  // Keep the rest of the app dynamic to avoid accidental prerendering of unknown parameter routes.
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];