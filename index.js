Object.defineProperty(this, 'gameState', {
    configurable: false,
    enumerable: false,
    writable: true,
});

(() => {

    const skills = localStorage.getItem('skills') ?? {};

    function parseURL(url) {
        const options = {};

        url = String(url);
        const startURL = url.indexOf('?') + 1;
        if (startURL <= 0) return options;
        let endURL = url.indexOf('#');
        if (endURL < 0)
            endURL = undefined;

        const splitPairs =
            url
            .substring(startURL, endURL)
            .split('&')
            .map(pair => pair.split('='))
            .filter(pair => pair[0].length > 0);
        
        for (pair of splitPairs) {
            let key = decodeURIComponent(pair[0]);
            let value = decodeURIComponent(pair[1] ?? '');
            if (value === '')
                value = true;
            else if (/^ *[+-]?[0-9]+.[0-9]* *$/.test(value))
                value = parseFloat(value);
            else if (/^ *[+-]?[0-9]+ *$/.test(value))
                value = parseInt(value);
            else switch(value.toLowerCase()) {
                case "false":
                    value = false;
                    break;
                case "true":
                    value = true;
                    break;
                default:
                    switch(value) {
                        case "NaN":
                            value = NaN;
                            break;
                        case "null":
                            value = null;
                            break;
                        case "undefined":
                            value = undefined;
                            break;
                    }
            }
            
            options[key] = value;
        }

        return options;
    }

    function cssStyleText(selector) {
        for (sheet of document.styleSheets) {
            const cssRule = Array.from(sheet.cssRules).find(rule => rule.selectorText === selector);
            if (typeof cssRule?.style?.cssText === 'string' && cssRule.style.cssText !== '')
                return cssRule.style.cssText;
        }

        console.warn(`Requested style for selector ${selector} not found in page stylesheets.`);
        return '';
    }

    function randomIdentifier(hasAdjective = Math.random() > 0.5, hasNoun = Math.random() > 0.5) {
        const animals = ["Alligator", "Alpaca", "Ant", "Anteater", "Ape", "Baboon", "Badger", "Beaver", "Bee", "Buffalo", "Butterfly", "Camel", "Cheetah", "Chicken", "Chimpanzee", "Chinchilla", "Cockroach", "Crab", "Dinosaur", "Dog", "Dogfish", "Dolphin", "Elephant", "Gazelle", "Giraffe", "Goat", "Goldfish", "Goose", "Gorilla", "Grasshopper", "Hamster", "Hedgehog", "Herring", "Hippopotamus", "Hornet", "Horse", "Human", "Hummingbird", "Jellyfish", "Kangaroo", "Koala", "Llama", "Lobster", "Mole", "Mongoose", "Monkey", "Moose", "Mosquito", "Mouse", "Mule", "Octopus", "Ostrich", "Oyster", "Parrot", "Penguin", "Pig", "Pigeon", "Pony", "Raccoon", "Rhino", "Sardine", "Scorpion", "Seahorse", "Seal", "Shark", "Snail", "Snake", "Spider", "Squirrel", "Termite", "Toad", "Trout", "Turkey", "Turtle", "Wasp", "Weasel", "Whale", "Wildcat", "Wolf", "Woodpecker", "Worm", "Zebra"];

        const adjectives = ["adorable", "alluring", "angelic", "appealing", "beautiful", "blissful", "blooming", "bright", "cheerful", "charming", "classy", "cuddly", "delightful", "divine", "elegant", "enchanting", "enticing", "exquisite", "fabulous", "fantastic", "fine", "foxy", "funny", "glamorous", "gleaming", "glorious", "gorgeous", "graceful", "grand", "handsome", "happy", "honest", "huggy", "lovely", "nice", "pleasant", "pretty", "pure", "radiant", "refined", "romantic", "satisfying", "seductive", "serene", "shining", "smart", "splendid", "stunning", "sublime", "super", "sweet", "tasteful", "thrilling", "tidy", "unreal", "vibrant", "warm", "winning", "wonderful", "wondrous", "zealous", "amazing", "attractive", "awesome", "beautiful", "blessed", "brave", "breezy", "bubbly", "calm", "carefree", "caring", "cute", "dandy", "dazzling", "delicate", "divine", "dynamic", "eager", "energetic", "enjoyable", "enthusiastic", "fanciful", "friendly", "fun", "generous", "genuine", "gracious", "harmonious", "helpful", "hilarious", "jolly", "joyful", "lively", "loveable", "lovely", "lucky", "merry", "nifty", "peaceful", "playful", "poised", "positive", "relaxed", "romantic", "sassy", "serene", "sharp", "silky", "smiling", "smooth", "sparkling", "spirited", "strong", "stylish", "talented"];

        function random(array, capitalize = false) {
            let random = array[
                Math.floor(Math.random() * array.length)
            ].toLowerCase();

            if (capitalize === true)
                random = random[0].toUpperCase() + random.slice(1);

            return random;
        }
        
        if (hasAdjective && hasNoun)
            return random(adjectives) + random(animals, true);
        else if (hasAdjective)
            return random(adjectives);
        else
            return random(animals);
    }

    // Written by GPT-3, not ashamed.
    // difficultyFactor can be 1, 2, ... 10
    function randomValue(difficultyFactor = 1) {
        let randomNumber = Math.random();
        if (randomNumber < 0.4 / difficultyFactor) {
            return null;
        } else if (randomNumber < 0.4 / difficultyFactor) {
            return Math.random() >= 0.5 ? true : false;
        } else if (randomNumber < 0.5) {
            let randomString = '';
            let loremIpsumWords = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore' ];
            let numWords = Math.floor(Math.random() * (difficultyFactor - 1) * 2) + difficultyFactor;
            for (let i = 0; i < numWords; i++) {
                randomString += loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)] + ' ';
            }
            return randomString.trim();
        } else {
            let randomNumber = Math.floor(Math.random() * (Math.pow(2, 1 + difficultyFactor) - 1) - Math.pow(2, 1 + difficultyFactor));
            return randomNumber;
        }
    }

    function randomObject() {
        const object = {};
        const length = Math.random() * 10;
        
        for (let i = 0; i < length; ++i) {
            object[randomIdentifier()] = randomValue()
        }

        return object;
    }

    function createAccessIdentifier(solve, mount, identifier) {
        Object.defineProperty(mount, identifier, {
            configurable: true,
            enumerable: true,
            get: () => { 
                solve(); 
                return "You read the variable!"; 
            },
            set: value => { 
                solve(); 
                return "You updated the variable!";
            },
        });
    }

    function createAssignmentIdentifier(solve, mount, identifier, initialValue, testCallback) {
        let currentValue = initialValue;
        Object.defineProperty(mount, identifier, {
            configurable: true,
            enumerable: true,
            get: () => { 
                solve();
                return currentValue; 
            },
            set: value => { 
                if (testCallback(value) === true)
                    solve(); 
                else
                    console.warn("Hmmm, is this what you are asked to put in me?")
                return value;
            },
        });
    }

    const levelData = [
        [
            `
Welcome to JS huggle, a game created by Orwa to help you
venture into JavaScript as a your first, general-purpose
logical language (also known as a programming language).  
    
In order to move to the next level, you will need to open
the console in the Browser developer tools and use it to
access a JavaScript identifier (a variable) named 
"variable".  

By accessing the variable, we mean reading its value, or
writing to it, either one of the two will allow you to 
pass this level and move to the next one.
            `,
            function (solve) {
                createAccessIdentifier(solve, this, 'variable');
                return () => { delete this.variable; };
            }
        ],
        [
            `
Good, now we will try something different.

Now I want you to update the value of "variable" with a
very specific value.

I would like this value to be a string containing the
word "fun".

I look forward to seeing you on the other side 😎.
            `,
            function (solve) {
                createAssignmentIdentifier(
                    solve, this, 'variable', 
                    '', value => /fun/i.test(value));
                return () => { delete this.variable; };
            }
        ],
        [
            `
Okay, this is going well.

Now I will test your ability to find things when they
are burried a little deeper.

namely, I would like you to look for a property inside
of an object, and access it.

The object I want you to dig into is named "object",
and the property's name will somehow make it clear that
it is the one you need to access to pass this level 🤭
            `,
            function (solve) {
                this.object = randomObject();
                createAccessIdentifier(
                    solve, this.object, 'accessMe');
                return () => { delete this.object; };
            }
        ],
    ]

    
    function refresh() {
        const data = 
            gameState.level < levelData.length ?
            [
                `Level ${gameState.level + 1}`,
                ...levelData[gameState.level]
            ] : [
                'You rock 🚀',
                `
Amazing, you have finished all the levels for now...

Orwa is incredibly impressed by you!!!
                `,
            function (solve) {
                return () => {};
            }
    
        ];
        const nodeLevel = gameState.templateLevel.content.cloneNode(true);
        const nodeFields = nodeLevel.querySelectorAll('#field');
        const funcLevel = data[data.length - 1];
        
        for (let [index, node] of Object.entries(nodeFields)) {
            node.innerText = data[index];
        }
    
        gameState.nodeApp.textContent = '';
        gameState.nodeApp.append(nodeLevel);

        if (typeof funcLevel === 'function')
            gameState.cleanup = funcLevel(solve);
        else
            console.error('ERROR: Invalid level setup function.')

        console.clear();
        console.info(`%cWelcome to ${data[0]}`,
            cssStyleText(".consoleTitle"));
        console.groupCollapsed("%cInstructions",
            cssStyleText(".consoleText"));
        console.info(data[1]);
        console.groupEnd();
    }
    
    function showTransition() {
        gameState.nodeApp.textContent = '';
        gameState.nodeApp.append(
            gameState.templateTransition.content.cloneNode(true)
        );
    }
    
    function solve() {
        if (typeof gameState.cleanup === 'function')
            gameState.cleanup();
        else
            console.error('ERROR: Invalid level cleanup function.')

        showTransition();
    
        // Increment level number and refresh view in a few seconds.
        localStorage.setItem('level', ++gameState.level)
        setTimeout(refresh, gameState.transitionTime);
    }
    
    function init() {
        this.gameState = {
            options: parseURL(window.location),
            templateLevel:
                document.querySelector('template#level'),
            templateTransition:
                document.querySelector('template#transition'),
            nodeApp:
                document.querySelector('div#application'),
        }
        
        if (typeof gameState.options.level === 'number') {
            gameState.level = gameState.options.level;
        } else {
            let storedLevel = localStorage.getItem('level');
            if (typeof storedLevel === 'string' &&
                /^[0-9]+$/.test(storedLevel))
                storegameState.level = parseInt(storedLevel);
        }
        
        gameState.level = gameState.level ?? 0;
        gameState.transitionTimerValue =
            (gameState.options.transition ?? 2000) + 500;
        Object.defineProperty(gameState, 'transitionTime', {
            get: function () { 
                return this.transitionTimerValue =
                    (this.transitionTimerValue - 500) 
                    * 0.9 + 500;
            },
            set: undefined,
        });
        
        refresh();
    }
    
    addEventListener('load', init);
})();