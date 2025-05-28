# 🕐 Analog Clock Web Component - SvelteKit Integration

This guide covers integrating the Analog Clock Web Component specifically into SvelteKit applications.

## 🚀 Quick Integration

### Method 1: Static Assets (Recommended)

1. **Copy the component file:**
   ```bash
   cp dist/analog-clock-component.js static/analog-clock-component.js
   ```

2. **Load in your app.html:**
   ```html
   <!-- src/app.html -->
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="utf-8" />
       <link rel="icon" href="%sveltekit.assets%/favicon.png" />
       <meta name="viewport" content="width=device-width" />
       %sveltekit.head%
       
       <!-- Load the web component globally -->
       <script src="%sveltekit.assets%/analog-clock-component.js"></script>
   </head>
   <body data-sveltekit-preload-data="hover">
       <div style="display: contents">%sveltekit.body%</div>
   </body>
   </html>
   ```

3. **Use in any Svelte component:**
   ```svelte
   <!-- src/routes/+page.svelte -->
   <script>
       import { onMount } from 'svelte';
       
       // Ensure the component is available
       onMount(() => {
           // Component should already be loaded from app.html
       });
   </script>
   
   <h1>My SvelteKit App</h1>
   <analog-clock width="300px" height="300px"></analog-clock>
   ```

### Method 2: Dynamic Import

1. **Place component in static folder:**
   ```bash
   cp dist/analog-clock-component.js static/analog-clock-component.js
   ```

2. **Create a Svelte wrapper component:**
   ```svelte
   <!-- src/lib/components/AnalogClock.svelte -->
   <script>
       import { onMount } from 'svelte';
       import { browser } from '$app/environment';
       
       export let width = '300px';
       export let height = '300px';
       
       let componentLoaded = false;
       
       onMount(async () => {
           if (browser && !customElements.get('analog-clock')) {
               // Dynamically import the web component
               await import('/analog-clock-component.js');
               componentLoaded = true;
           } else {
               componentLoaded = true;
           }
       });
   </script>
   
   {#if componentLoaded}
       <analog-clock {width} {height}></analog-clock>
   {:else}
       <div class="loading" style="width: {width}; height: {height};">
           Loading clock...
       </div>
   {/if}
   
   <style>
       .loading {
           display: flex;
           align-items: center;
           justify-content: center;
           background: rgba(255, 255, 255, 0.1);
           border-radius: 50%;
           color: white;
       }
   </style>
   ```

3. **Use the wrapper:**
   ```svelte
   <!-- src/routes/+page.svelte -->
   <script>
       import AnalogClock from '$lib/components/AnalogClock.svelte';
   </script>
   
   <h1>My SvelteKit App</h1>
   <AnalogClock width="400px" height="400px" />
   ```

### Method 3: NPM Package (If Publishing)

If you want to publish this as an NPM package for easier SvelteKit integration:

1. **Create package.json for the component:**
   ```json
   {
     "name": "@yourorg/analog-clock-component",
     "version": "1.0.0",
     "main": "dist/analog-clock-component.js",
     "files": ["dist/"],
     "keywords": ["web-component", "clock", "svelte", "react"]
   }
   ```

2. **Install in SvelteKit:**
   ```bash
   npm install @yourorg/analog-clock-component
   ```

3. **Use in SvelteKit:**
   ```svelte
   <script>
       import { onMount } from 'svelte';
       import { browser } from '$app/environment';
       
       onMount(async () => {
           if (browser) {
               await import('@yourorg/analog-clock-component');
           }
       });
   </script>
   
   <analog-clock></analog-clock>
   ```

## 🔧 SvelteKit-Specific Considerations

### 1. Server-Side Rendering (SSR)
```svelte
<!-- Handle SSR gracefully -->
<script>
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    
    let mounted = false;
    
    onMount(() => {
        mounted = true;
    });
</script>

{#if browser && mounted}
    <analog-clock></analog-clock>
{:else}
    <!-- SSR fallback -->
    <div class="clock-placeholder">
        🕐 Clock loading...
    </div>
{/if}
```

### 2. TypeScript Support
```typescript
// src/app.d.ts
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }
    
    // Declare the custom element for TypeScript
    namespace svelteHTML {
        interface IntrinsicElements {
            'analog-clock': {
                width?: string;
                height?: string;
                class?: string;
                style?: string;
            };
        }
    }
}

export {};
```

### 3. Vite Configuration (if needed)
```javascript
// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: ['analog-clock-component'] // Exclude if causing issues
    }
};

export default config;
```

## 🎨 Styling in SvelteKit

### Global Styles
```css
/* src/app.css */
analog-clock {
    display: block;
    margin: 20px auto;
    border-radius: 50%;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
```

### Component-Specific Styles
```svelte
<script>
    let clockClass = 'my-custom-clock';
</script>

<analog-clock class={clockClass}></analog-clock>

<style>
    :global(.my-custom-clock) {
        border: 2px solid white;
        border-radius: 50%;
    }
</style>
```

## 🔄 Reactive Properties

Create a reactive wrapper for dynamic sizing:

```svelte
<!-- src/lib/components/ResponsiveClock.svelte -->
<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    
    export let size = 300;
    
    $: clockSize = `${size}px`;
    
    let clockElement;
    
    onMount(async () => {
        if (browser && !customElements.get('analog-clock')) {
            await import('/analog-clock-component.js');
        }
    });
    
    // Update size reactively
    $: if (clockElement) {
        clockElement.setAttribute('width', clockSize);
        clockElement.setAttribute('height', clockSize);
    }
</script>

<analog-clock 
    bind:this={clockElement}
    width={clockSize} 
    height={clockSize}
></analog-clock>
```

## 📱 Mobile Considerations

```svelte
<!-- Responsive clock for mobile -->
<script>
    import { onMount } from 'svelte';
    
    let innerWidth = 0;
    let clockSize;
    
    $: {
        if (innerWidth < 768) {
            clockSize = '200px';
        } else if (innerWidth < 1024) {
            clockSize = '300px';
        } else {
            clockSize = '400px';
        }
    }
</script>

<svelte:window bind:innerWidth />

<analog-clock width={clockSize} height={clockSize}></analog-clock>
```

## 🚀 Performance Tips

1. **Lazy Loading:**
   ```svelte
   <script>
       import { onMount } from 'svelte';
       import { intersectionObserver } from '$lib/utils/intersection';
       
       let clockContainer;
       let shouldLoad = false;
       
       onMount(() => {
           const observer = intersectionObserver(clockContainer, () => {
               shouldLoad = true;
           });
           
           return () => observer.disconnect();
       });
   </script>
   
   <div bind:this={clockContainer}>
       {#if shouldLoad}
           <analog-clock></analog-clock>
       {:else}
           <div class="placeholder">Clock will load when visible</div>
       {/if}
   </div>
   ```

2. **Preloading:**
   ```svelte
   <!-- In your layout -->
   <svelte:head>
       <link rel="preload" href="/analog-clock-component.js" as="script">
   </svelte:head>
   ```

## 🐛 Common Issues & Solutions

### Issue: Component not rendering
**Solution:** Ensure it's loaded client-side only:
```svelte
{#if browser}
    <analog-clock></analog-clock>
{/if}
```

### Issue: TypeScript errors
**Solution:** Add the declaration to `app.d.ts` as shown above.

### Issue: Hydration mismatch
**Solution:** Use `onMount` to ensure client-side rendering:
```svelte
<script>
    let mounted = false;
    onMount(() => mounted = true);
</script>

{#if mounted}
    <analog-clock></analog-clock>
{/if}
```

## 📦 Complete Example

Here's a complete SvelteKit page using the clock:

```svelte
<!-- src/routes/clock/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    
    let mounted = false;
    let clockSize = '300px';
    
    onMount(async () => {
        if (browser && !customElements.get('analog-clock')) {
            await import('/analog-clock-component.js');
        }
        mounted = true;
    });
    
    function toggleSize() {
        clockSize = clockSize === '300px' ? '400px' : '300px';
    }
</script>

<svelte:head>
    <title>Analog Clock - SvelteKit Demo</title>
</svelte:head>

<main>
    <h1>Beautiful Analog Clock</h1>
    
    {#if browser && mounted}
        <analog-clock width={clockSize} height={clockSize}></analog-clock>
        <button on:click={toggleSize}>
            Toggle Size ({clockSize})
        </button>
    {:else}
        <div class="loading">Loading clock...</div>
    {/if}
</main>

<style>
    main {
        text-align: center;
        padding: 2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        color: white;
    }
    
    .loading {
        width: 300px;
        height: 300px;
        margin: 2rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }
    
    button {
        margin-top: 2rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 0.5rem;
        color: white;
        cursor: pointer;
    }
</style>
```

The web component works great in SvelteKit! The main considerations are handling SSR properly and ensuring the component loads client-side only. 