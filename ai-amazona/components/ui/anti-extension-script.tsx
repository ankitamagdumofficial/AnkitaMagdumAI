/**
 * Anti-Extension Script Component
 * This component prevents browser extensions from causing hydration mismatches
 * by temporarily blocking certain DOM modifications during the critical hydration period
 */
export function AntiExtensionScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Store original methods
            var originalSetAttribute = Element.prototype.setAttribute;
            var originalRemoveAttribute = Element.prototype.removeAttribute;
            var originalHTMLSetAttribute = HTMLHtmlElement.prototype.setAttribute;
            var isHydrationComplete = false;
            
            // Immediately remove any existing extension attributes
            var htmlElement = document.documentElement;
            ['bbai-tooltip-injected', 'data-new-gr-c-s-check-loaded', 'data-gr-ext-installed'].forEach(function(attr) {
              if (htmlElement.hasAttribute(attr)) {
                htmlElement.removeAttribute(attr);
                console.log('Removed existing extension attribute:', attr);
              }
            });
            
            // List of extension attributes to block during hydration
            var extensionAttributes = [
              'bbai-tooltip-injected',
              'data-new-gr-c-s-check-loaded', 
              'data-gr-ext-installed',
              'data-gramm',
              'data-gramm_editor',
              'grammarly-extension',
              'data-grammarly-shadow-root',
              'spellcheck'
            ];
            
            // More aggressive blocking for HTML element specifically
            HTMLHtmlElement.prototype.setAttribute = function(name, value) {
              if (!isHydrationComplete && extensionAttributes.includes(name.toLowerCase())) {
                console.log('Blocked HTML extension attribute:', name, 'during hydration');
                return;
              }
              return originalHTMLSetAttribute.call(this, name, value);
            };
            
            // Override setAttribute during hydration
            Element.prototype.setAttribute = function(name, value) {
              if (!isHydrationComplete && extensionAttributes.includes(name.toLowerCase())) {
                // Block extension attributes during hydration
                console.log('Blocked extension attribute:', name, 'during hydration');
                return;
              }
              return originalSetAttribute.call(this, name, value);
            };
            
            // Override removeAttribute during hydration
            Element.prototype.removeAttribute = function(name) {
              if (!isHydrationComplete && extensionAttributes.includes(name.toLowerCase())) {
                // Block extension attribute removal during hydration
                return;
              }
              return originalRemoveAttribute.call(this, name);
            };
            
            // Also block MutationObserver during hydration
            var originalMutationObserver = window.MutationObserver;
            window.MutationObserver = function(callback) {
              return new originalMutationObserver(function(mutations, observer) {
                if (!isHydrationComplete) {
                  // Filter out extension-related mutations during hydration
                  var filteredMutations = mutations.filter(function(mutation) {
                    if (mutation.type === 'attributes') {
                      return !extensionAttributes.includes(mutation.attributeName);
                    }
                    return true;
                  });
                  if (filteredMutations.length > 0) {
                    callback(filteredMutations, observer);
                  }
                } else {
                  callback(mutations, observer);
                }
              });
            };
            
            // Mark hydration as complete after React loads
            window.addEventListener('DOMContentLoaded', function() {
              setTimeout(function() {
                isHydrationComplete = true;
                // Restore original methods
                Element.prototype.setAttribute = originalSetAttribute;
                Element.prototype.removeAttribute = originalRemoveAttribute;
                HTMLHtmlElement.prototype.setAttribute = originalHTMLSetAttribute;
                window.MutationObserver = originalMutationObserver;
                console.log('Hydration protection disabled - extensions can now modify DOM');
              }, 5000); // 5 second delay to ensure hydration is complete
            });
          })();
        `,
      }}
    />
  )
} 