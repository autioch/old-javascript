window.rules = [
    {
        /* TODO generate link from label */

        link: 'general',
        label: 'General',
        rules: [
            {
                link: 'boilerplates',
                label: 'Boilerplates',
                content: 'Use boilerplates for faster startup. There\'s plenty of frameworks and tools that generate whole projects ready for development.'
            },
            {
                link: 'modules',
                label: 'Modules',
                content: 'Use require.js or other, similar tools to split code into smaller files for easier development.'
            },
            {
                link: 'refactoring',
                label: 'Refactoring',
                content: 'Include refactoring in your development process. Do it when possible on small parts, before it ' +
                        'will mean spending 3 days on refactoring half of application.'
            },
            {
                link: 'dry-kiss',
                label: 'DRY KISS',
                content: 'Keep balance between those two rules.'
            },
            {
                link: 'upgrade-yourself',
                label: 'Upgrade yourself',
                content: 'Remember about keeping yourself up to date. People keep finding out better ways for doing stuff and solving problems you\'re facing every day.'
            }
        ]
    },
    {
        link: 'coding',
        label: 'Coding',
        rules: [
            {
                link: 'formatting',
                label: 'Formatting',
                content: 'Extra spaces and line breaks make code more readible. Most of the editors have a feature to format code for you. ' +
                        ' In Visual Studio, it will be Ctrl + K, Ctrl + D. In Netbeans, Ctrl + Shift + F.'
            },
            {
                link: 'indents',
                label: 'Indents',
                content: 'Code should rarely need more than 2-3 indents. If it features many conditional statements, refactor it now before it grows out of control.'
            },
            {
                link: 'comments',
                label: 'Comments',
                content: 'Even a single line of comment can be a lifesaver for the reader.'
            },
            {
                link: 'actionable-comments',
                label: 'Actionable comments',
                content: 'Comments beggining with TODO, FIXME, REFACTOR are meant to notify reader of action needed.'
            },
            {
                link: 'helpers',
                label: 'Helpers',
                content: 'Build up helpers for methods repeatable across modules.  %http://en.wikipedia.org/wiki/Don%27t_repeat_yourself% .'
            },
            {
                link: 'method-names',
                label: 'Method names',
                content: 'Use method names describing what the method does. If it modifies object, indicate that in name. If it checks object state, indicate that in name.'
            },
            {
                link: 'method-length',
                label: 'Method length',
                content: 'One method is for one functionality. That ensures method is short and readable. %http://en.wikipedia.org/wiki/KISS_principle% .'
            }
        ]
    },
    {
        link: 'html-and-dom',
        label: 'HTML and DOM',
        rules: [
            {
                link: 'tag-usage',
                label: 'Tag usage',
                content: 'Use correct tags for your purposes. HTML5 introduced new tags that can be used in your RIA.'
            },
            {
                link: 'script-tag',
                label: 'Script tag',
                content: 'Place script tags and the bottom of the page.'
            },
            {
                link: 'unobtrusive-javascript',
                label: 'Unobtrusive javascript',
                content: 'Do not leak javscript code directly into html. Leaks are bad.'
            },
            {
                link: 'dom-manipulation',
                label: 'DOM manipulation',
                content: 'Use document fragment or detached element for multiple DOM operations to prevent multiple reflows and repaints.'
            }
        ]
    },
    {
        link: 'javascript',
        label: 'JavaScript',
        rules: [
            {
                link: 'that',
                label: 'That, $this, $that',
                content: 'Those are bad. Period. Prefer .bind().'
            },
            {
                link: 'inline-anonymous-functions',
                label: 'Inline anonymous functions',
                content: 'Do not use inline and/or anonymous functions longer than few lines.'
            },
            {
                link: 'local-variables',
                label: 'Local variables',
                content: 'Always declare variables with var. Declare variables that will be used for sure at the top of the function. Do not use var inside loops.'
            },
            {
                link: 'global-variables',
                label: 'Global variables',
                content: 'If there is a need for global variable, declare and use it as global object (window) property for easier tracking.'
            },
            {
                link: 'return-values',
                label: 'Return values',
                content: 'Always ensure that functions return correct values. If no value is expected, return this (for chaining) or false (to cancel events), but be consistent.'
            },
            {
                link: 'eval',
                label: 'Eval',
                content: 'Eval is evil.'
            },
            {
                link: 'private-methods-and-variables',
                label: 'Private methods and variables',
                content: 'Declare private methods and variables starting with _ .'
            },
            {
                link: 'strict-mode',
                label: 'Strict mode',
                content: 'When possible, use strict mode.'
            },
            {
                link: 'code-validation',
                label: 'Code validation',
                content: 'Validate your code.  %http://www.jslint.com% .'
            },
            {
                link: 'iife',
                label: 'IIFE',
                content: 'Immediately-invoked function expressions sometimes can come really handy.'
            },
            {
                link: 'closures',
                label: 'Closures',
                content: 'Useful, but remember that it keeps pointer to enclosing scope.'
            },
            {
                link: 'property-notation',
                label: 'Property notation',
                content: 'Prefer obj.property over obj[\'propertyname\'] when possible.'
            },
            {
                link: 'delete',
                label: 'Delete',
                content: 'Do not use it, unless you need to remove property key. Prefer setting value to null.'
            },
            {
                link: 'strings',
                label: 'Strings',
                content: 'For consistency single-quotes (\') are preferred to double-quotes ("). This is helpful when creating strings that include HTML.'
            },
            {
                link: 'function-parameters',
                label: 'Function parameters',
                content: 'If function requires more than few arguments, prefer passing an object instead.'
            },
            {
                link: 'prototype',
                label: 'Prototype',
                content: 'Avoid when possible.'
            },
            {
                link: 'true-false',
                label: 'True False',
                content: 'undefined, null, 0, false, NaN, \'\' (empty string) are all falsy.'
            },
            {
                link: 'semicolons',
                label: 'Semicolons',
                content: 'Use them. Never rely on ASI.'
            }
        ]
    },
    {
        link: 'javascript-events',
        label: 'Javascript events',
        rules: [
            {
                link: 'tag-classes-for-events',
                label: 'Tag classes for events',
                content: 'Use classes starting with js- for javascript interactivity to separate css from js.'
            },
            {
                link: 'listeners',
                label: 'Listeners',
                content: 'Embrace Backbone.Events. Use listenTo and stopListening.'
            },
            {
                link: 'event-names',
                label: 'Event names',
                content: 'Use single naming convetion, for example: "item-action-mode/other" or "action-item-mode/other", but stick to it.'
            },
            {
                link: 'event-names',
                label: 'Event names',
                content: 'Create custom event names or namespace existing ones for easier binding and unbinding.'
            },
            {
                link: 'event-delegation',
                label: 'Event delegation',
                content: 'Delegate events from parents when possible, to avoid too many event listeners.'
            }
        ]
    },
    {
        link: 'jquery',
        label: 'jQuery',
        rules: [
            {
                link: 'node-content',
                label: 'Node content',
                content: 'Depending on the situation, use html(), empty(), textContent, append() or similar.'
            },
            {
                link: 'css',
                label: 'CSS',
                content: 'Avoid css(). Instead of modyfing styles via css(), add or remove classes.'
            },
            {
                link: 'chaining',
                label: 'Chaining',
                content: 'Chain methods when possible. Remember end().'
            },
            {
                link: 'selectors',
                label: 'Selectors',
                content: 'Use efficient selectors.'
            },
            {
                link: 'caching',
                label: 'Caching',
                content: 'Use cache for often used DOM queries. Remember to nullify them at the end.'
            },
            {
                link: 'multiple-set',
                label: 'Multiple set',
                content: 'Instead of calling the same function multiple times, pass an object.'
            }
        ]
    },
    {
        link: 'lodash',
        label: 'Lodash',
        rules: [
            {
                link: 'utilities',
                label: 'Utilites',
                content: 'Lodash offers more than collection/array utilites. Read up bottom part of API.'
            },
            {
                link: 'method-context',
                label: 'Method Context',
                content: 'Most of the lodash functions accept additional argument, to which the context of the callback function will be set.'
            }
        ]
    },
    {
        link: 'css',
        label: 'CSS',
        rules: [
            {
                link: 'font-sizes',
                label: 'Font sizes',
                content: 'Use em or rem for font sizes.'
            },
            {
                link: 'calc',
                label: 'calc',
                content: 'Use calc() for calculating widths and heights where needed.'
            },
            {
                link: 'svg-styling',
                label: 'SVG styling',
                content: 'SVG can be styled just like any other tags, but with diffrent attributes.'
            },
            {
                link: 'width-margin',
                label: 'Width margin',
                content: 'Setting width and any of: margin, padding or border without box-sizing is bad.'
            },
            {
                link: 'caniuse',
                label: 'Can I use',
                content: 'Great for ensuring browser support.'
            },
            {
                link: 'position-and-float',
                label: 'Position and float',
                content: 'Avoid when possible.'
            },
            {
                link: 'important',
                label: 'Important',
                content: 'Should never be needed. Breaks specifity.'
            },
            {
                link: 'inlining',
                label: 'Inlining',
                content: 'Do not use style attribute. Never.'
            }
        ]
    },
    {
        link: 'sass',
        label: 'SASS',
        rules: [
            {
                link: 'vendor-prefixes',
                label: 'Vendor prefixes',
                content: 'Create mixins for vendor prefixes to ensure the attribute has always got applied.'
            },
            {
                link: 'placeholder-selectors',
                label: 'Placeholder selectors',
                content: 'Create placeholder selectors for common attribute sets that will not be overwritten.'
            },
            {
                link: 'extend',
                label: 'Extend',
                content: 'Powerfull, but be careful with usage. Do not chain @extends.'
            },
            {
                link: 'color-libraries',
                label: 'Color libraries',
                content: 'Group all colors, google "firendly sass color names" for techniques.'
            },
            {
                link: 'zindex',
                label: 'Z-index',
                content: 'Use method for layering that allows easy changes without setting values over 9000.'
            },
            {
                link: 'output-format',
                label: 'Output format',
                content: 'Use diffrent outpust styles depending on the situation.'
            },
            {
                link: 'no-more-than-3',
                label: 'No more than 3',
                content: 'Do not overuse SASS nesting.'
            },
            {
                link: 'shame-partial',
                label: 'Shame Partial',
                content: 'Urgent, dirty, quick fixes go there, only to be fixed in free time.'
            },
            {
                link: 'sourcemaps',
                label: 'Sourcemaps',
                content: 'If you do not use them, do not generate them --sourcemap=none. '
            },
            {
                link: 'fun',
                label: 'Fun',
                content: 'SASS is fun. %http://thesassway.com/advanced/inverse-trigonometric-functions-with-sass% . '
            }
        ]
    }
];