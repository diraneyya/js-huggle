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

    function createRandomObject(
        numAttributes,
        hasStrings = true,
        hasNumbers = true,
        hasDates = true,
        hasBooleans = true,
        hasArrays = false
    ) {
        const objectArchive = {
            name: "John Doe", 
            age: 35,
            isMarried: true,
            dateOfBirth: new Date(1985, 8, 4),
            hobbies: ["photography", "fishing", "drawing"],
            favoriteMovies: [
                "The Godfather",
                "The Lord of the Rings",
                "Good Will Hunting",
            ],
            favoriteFood: "pizza",
            numSiblings: 0,
            isStudent: false,
            occupation: "software engineer",
            salary: 85000,
            hasCar: true,
            catsOwned: 2,
            isOrganized: false,
            isAthlete: true,
            isBusy: true,
            isActive: false,
            yearsInSchool: 5,
            isHappy: true,
            isCreative: true,
            isCheerful: false,
            isChatty: false,
            numYearsEmployed: 10,
            isGoodAtMath: true,
            isIntroverted: false,
            dreams: ["become a doctor", "start a business", "travel the world"],
            isFlexible: true,
            isReliable: false,
            isTrustworthy: true,
            isLoyal: true,
            isHonest: true,
            isCaring: false,
            isCurious: true,
            numVacationsTaken: 3,
            numCountriesVisited: 7,
            isRespectful: false,
            isHelpful: true,
            isPatient: false,
            isEnergetic: true,
            isOutgoing: false,
            isTidy: true,
            isCalm: false,
            isForgetful: true,
            isIndependent: false,
            isPunctual: true,
            isMeticulous: false,
            isResourceful: true,
            isMethodical: false,
            numFriends: 5,
            numPets: 0,
            isLazy: true,
            isDisciplined: false,
            isOrganized: true,
            hasPlans: true,
            isWise: false,
            isRash: true,
            isLikable: false,
            isSensitive: true,
            isHumorous: false,
            isOptimistic: true,
            isGenerous: false,
            isPassionate: true,
            isAmbitious: false,
            isAdventurous: true,
            isSociable: false,
            isSilly: true,
            isHonest: false,
            isMotivated: true,
            isDiligent: false,
            isGrateful: true,
            isResilient: false,
            isInquisitive: true,
            isPractical: false,
            isInnovative: true,
            isFunny: false,
            isRelaxed: true,
            isAdventurous: false,
            isCurious: true,
            isImpulsive: false,
            isTactful: true,
            isUnderstanding: false,
            isResponsible: true,
            isDependable: false,
            isFocused: true,
            isSympathetic: false,
            isKind: true,
            isIndustrious: false,
            isEmotional: true,
            isCourageous: false,
            isPerceptive: true,
            isAnalytical: false,
            isThoughtful: true,
            isEmpathetic: false,
            isBold: true,
            isImaginative: false,
            isAssertive: true,
            isEnthusiastic: false,
            isOpenminded: true,
            isDetailoriented: false,
            isFriendly: true,
            username: "johndoe",
            password: "MySecretPassword",
            hashedPassword: "7f33b509a7848d0fe8f8e",
            registeredOn: new Date(2020, 2, 1),
            lastLoggedIn: new Date(2020, 5, 12),
            numLikes: 58,
            creditCardNumber: "1234-5678-9876-5432",
            dateOfBirth: new Date(1988, 6, 11),
            passportNumber: "ABC1234567",
            coordinates: [45.6789, -98.7654],
            favoriteColor: "#ff0000",
            numFollowers: 745,
            numTweets: 563,
            numPoints: 83,
            numShares: 28,
            numFriends: 33,
            numFavorites: 14,
            numRetweets: 12,
            numComments: 64,
            numLikesReceived: 28,
            numViews: 456,
            numVotes: 78,
            numVideos: 32,
            numVotesReceived: 22,
            numLists: 9,
            numParticipants: 6,
            numRounds: 8,
            numQuestions: 15,
            numPages: 10,
            numAnswers: 4,
            numUsers: 12,
            numJobs: 5,
            numEmployees: 20,
            numProjects: 8,
            numClients: 11,
            numTasks: 10,
            numTickets: 3,
            numItems: 6,
            numTasksCompleted: 4,
            numWeeks: 10,
            numYears: 4,
            numMonths: 8,
            numDays: 30,
            numHours: 24,
            numMinutes: 60,
            numSeconds: 60,
            numSharesReceived: 33,
            numProductsSold: 12,
            numLanguagesSpoken: 5,
            numCountriesVisited: 5,
            numCitiesVisited: 9,
            numPeopleMet: 7,
            numTripsTaken: 4,
            numMilesTraveled: 876,
            numBooksRead: 10,
            numArticlesWritten: 5,
            numMoviesWatched: 8,
            numGamesPlayed: 6,
            numAwardsWon: 2,
            numEventsAttended: 15,
            numPhotosTaken: 12,
            numVideosRecorded: 5,
            numPodcastsSubscribed: 7,
            numPodcastsListened: 10,
            numWebinarsAttended: 8,
            numConferencesAttended: 3,
            numCoursesCompleted: 6,
            numCertificationsEarned: 4,
            numPresentationsGiven: 5,
            numWorkshopsAttended: 7,
            numNetworksJoined: 9,
            numGroupsJoined: 3,
            numStartupsLaunched: 1,
            numPartnershipsFormed: 2,
            numFundsRaised: 4,
            numInvestors: 5,
            numDealsClosed: 6,
            numPitchesMade: 8,
            numProductsLaunched: 10,
            numPatentsFiled: 3,
            numCollaborations: 4,
            numWebsitesCreated: 6,
            numBlogsWritten: 7,
            numVideosPublished: 5,
            numWebinarsHosted: 3,
            numPodcastsHosted: 4,
            numEventsOrganized: 6,
            numProjectsCompleted: 8,
            numClientsServed: 10,
            numContractsSigned: 3,
            numGoalsAchieved: 4,
            numGrantsReceived: 6,
            numMentorsMentored: 7,
            numVolunteerHours: 8,
            numArticlesPublished: 5,
            numPublications: 4,
            numTalksDelivered: 6,
            numGrantsAwarded: 7,
            numGoalsSet: 8,
            numObjectivesAccomplished: 10,
            shape: "square",
            color: "blue",
            size: "small",
            type: "circle",
            style: "modern",
            length: "long",
            width: "narrow",
            material: "wood",
            pattern: "striped",
            orientation: "vertical",
            direction: "west",
            location: "northwest",
            operator: "+",
            operation: "addition",
            position: "center",
            alignment: "left",
            format: "PDF",
            encoding: "UTF-8",
            category: "electronics",
            class: "A",
            level: "expert",
            status: "active",
            source: "web",
            mode: "manual",
            protocol: "HTTP",
            typeface: "Arial",
            fontSize: "16pt",
            fontWeight: "bold",
            fontStyle: "italic",
            language: "English",
            currency: "USD",
            unit: "metric",
            timezone: "GMT",
            method: "POST",
            methodName: "addUser",
            formatType: "JSON",
            formatVersion: "1.0",
            encryptionType: "AES",
            encryptionVersion: "2.0",
            paymentType: "credit card",
            paymentMethod: "PayPal",
            paymentStatus: "pending",
            paymentDate: new Date(2020, 6, 1),
            paymentAmount: 45.0,
            paymentCurrency: "EUR",
            paymentReference: "123456789",
            paymentProvider: "Visa",
            authorizationCode: "ABCDEF",
            authorizationDate: new Date(2020, 7, 4),
            authorizationStatus: "approved",
            authorizationType: "online",
            authorizationProvider: "MasterCard",
            authorizationReference: "987654321",
            authenticationType: "password",
            authenticationMethod: "2FA",
            authenticationStatus: "verified",
            authenticationProvider: "Google",
            authenticationReference: "87654321",
            authenticationDate: new Date(2020, 8, 1),
            verificationType: "email",
            verificationMethod: "SMS",
            verificationStatus: "pending",
            verificationProvider: "Twitter",
            verificationReference: "456789123",
            verificationDate: new Date(2020, 9, 4),
            validationType: "captcha",
            validationMethod: "OTP",
            validationStatus: "invalid",
            validationProvider: "Facebook",
            validationReference: "0987654321",
            validationDate: new Date(2020, 10, 1),
            sessionType: "user",
            sessionStatus: "active",
            sessionProvider: "LinkedIn",
            sessionReference: "567891234",
            sessionDate: new Date(2020, 11, 4),
            ruleType: "access",
            ruleStatus: "enabled",
            ruleProvider: "Amazon",
            ruleReference: "ABCDEFG",
            ruleDate: new Date(2020, 12, 1),
            policyType: "privacy",
            policyStatus: "enforced",
            policyProvider: "Apple",
            policyReference: "HIJKLMNOP",
            policyDate: new Date(2021, 1, 4),
            algorithmType: "encryption",
            algorithmStatus: "enabled",
            algorithmProvider: "Microsoft",
            algorithmReference: "QRSTUVWXYZ",
            algorithmDate: new Date(2021, 2, 1),
            encryptionType: "AES-256",
            encryptionStatus: "verified",
            encryptionProvider: "IBM",
            encryptionReference: "1234567890",
            encryptionDate: new Date(2021, 3, 4),
            protocolType: "network",
            protocolStatus: "secure",
            protocolProvider: "Oracle",
            protocolReference: "0987654321",
        };
    
        propertiesSortedByName = Object.entries(objectArchive).sort((a, b) =>
            a[0] > b[0] ? 1 : a[0] == b[0] ? 0 : -1
        );
    
        function getPropertiesOfType(type = "object", constructor) {
            return propertiesSortedByName.filter((pair) => {
                let condition = false;
                if (typeof type === "string" && type !== "object")
                    condition ||= typeof pair[1] === type;
                if (typeof constructor === "function")
                    condition ||=
                        typeof pair[1] === "object" &&
                        pair[1] instanceof constructor;
    
                return condition;
            });
        }
    
        boolProperties = getPropertiesOfType("boolean", Boolean);
        stringProperties = getPropertiesOfType("string", String);
        dateProperties = getPropertiesOfType("object", Date);
        numericProperties = getPropertiesOfType("number", Number);
        arrayProperties = getPropertiesOfType("object", Array);
    
        Array.prototype.random = function () {
            return this[Math.floor(Math.random() * this.length)];
        };
    
        function getRandomProperty() {
            properties = [];
            if (hasStrings) properties.push(stringProperties);
            if (hasNumbers) properties.push(numericProperties);
            if (hasDates) properties.push(dateProperties);
            if (hasBooleans) properties.push(boolProperties);
            if (hasArrays) properties.push(arrayProperties);
    
            return properties.random().random();
        }
    
        const object = {};
        for (let i = 0; i < numAttributes; ++i) {
            const property = getRandomProperty();
            object[property[0]] = property[1];
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
            get: undefined,
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
                this.object = createRandomObject(
                    2 + Math.round(Math.random())
                );
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

        if (typeof gameState.cleanup === 'function')
            gameState.cleanup();
        else if (gameState.started === true)
            console.error('ERROR: Invalid level cleanup function.')

        if (typeof funcLevel === 'function') {
            gameState.started = true;
            gameState.cleanup = funcLevel(solve);
        } else
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
        showTransition();
    
        // Increment level number and refresh view in a few seconds.
        localStorage.setItem('level', ++gameState.level)
        setTimeout(refresh, gameState.transitionTime);
    }

    function prevLevel() {
        localStorage.setItem('level', --gameState.level)
        refresh();
    }

    function nextLevel() {
        localStorage.setItem('level', ++gameState.level)
        refresh();
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
                gameState.level = parseInt(storedLevel);
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
        
        document.querySelector('#nextLevel')
            .addEventListener('click', nextLevel);
        document.querySelector('#prevLevel')
            .addEventListener('click', prevLevel);

        refresh();
    }
    
    addEventListener('load', init);
})();