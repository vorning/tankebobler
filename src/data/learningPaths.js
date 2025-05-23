const learningPaths = [
  {
    id: "filosofiens-grundsten",
    title: "Filosofiens Grundsten",
    description:
      "Udforsk filosofiens store spørgsmål sammen med Sofie og Alberto",
    requiredLevel: 1,
    icon: "philosophy",
    color: "#8A2BE2",
    character: "filo",
    lessons: [
      {
        id: "hvad-er-filosofi",
        title: "Hvad er filosofi?",
        description: "Lær om hvordan filosofi begyndte som undren over verden",
        contentType: "story",
        xpReward: 50,
        content: `
            <p>Sofie sad i haven og tænkte. En dag fik hun et mystisk brev med spørgsmålet: "Hvem er du?"</p>
            <p>Det fik hende til at tænke over, hvad det egentlig betyder at eksistere. Hun havde aldrig før tænkt over, hvor specielt det er at være til.</p>
            <p>Filosofi begynder med undren - at stille spørgsmål til det, som andre tager for givet. For eksempel:</p>
            <ul>
              <li>Hvorfor findes verden?</li>
              <li>Hvem er jeg?</li>
              <li>Hvad er rigtigt og forkert?</li>
            </ul>
            <p>Filosoffer er mennesker, som ikke kan lade være med at undre sig og stille spørgsmål. Ligesom børn, der hele tiden spørger "hvorfor?"</p>
          `,
        quiz: {
          id: "filosofi-intro-quiz",
          title: "Test din viden om filosofi",
          questions: [
            {
              question: "Hvad handler filosofi grundlæggende om?",
              options: [
                "At lære historiske fakta",
                "At undre sig og stille spørgsmål",
                "At læse gamle bøger",
                "At være klog på skolen",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad fik Sofie til at begynde at filosofere?",
              options: [
                "En lærer gav hende en opgave",
                "Hun læste en bog om filosofi",
                'Hun fik et mystisk brev med spørgsmålet "Hvem er du?"',
                "Hun så en dokumentar om filosofi",
              ],
              correctIndex: 2,
            },
            {
              question: "Hvilket af disse er et filosofisk spørgsmål?",
              options: [
                "Hvad er klokken?",
                "Hvad skal jeg have til aftensmad?",
                "Hvor gammel er jorden?",
                "Hvad er meningen med livet?",
              ],
              correctIndex: 3,
            },
          ],
        },
      },
      {
        id: "de-gamle-graeske-filosoffer",
        title: "De gamle græske filosoffer",
        description: "Mød Sokrates, Platon og Aristoteles - filosofiens fædre",
        contentType: "interactive",
        xpReward: 60,
        content: {
          sections: [
            {
              title: "Sokrates",
              text: `Sokrates levede i Athen for ca. 2400 år siden. Han gik rundt i byen og stillede spørgsmål til folk. Han sagde: "Jeg ved, at jeg intet ved." Dette betød, at han var klog nok til at vide, hvor meget han ikke vidste.`,
              activity: {
                type: "dragdrop",
                instruction: "Træk begreberne til den rigtige beskrivelse",
                items: [
                  {
                    id: "sokrates",
                    text: "Sokrates",
                    description:
                      'Stillede spørgsmål og sagde "Jeg ved, at jeg intet ved"',
                  },
                  {
                    id: "platon",
                    text: "Platon",
                    description:
                      "Sokrates' elev som skrev dialoger og grundlagde en skole",
                  },
                  {
                    id: "aristoteles",
                    text: "Aristoteles",
                    description:
                      "Undersøgte naturen og grundlagde logik og videnskabelig metode",
                  },
                ],
              },
            },
            {
              title: "Platon",
              text: `Platon var Sokrates' elev. Han skrev bøger om Sokrates' samtaler. Platon mente, at den virkelige verden er idéernes verden - de perfekte tanker og idéer bag alt, hvad vi ser.`,
              activity: {
                type: "thought_experiment",
                instruction: "Tænk over Platons hulelignelse:",
                content: `Forestil dig en hule, hvor mennesker sidder lænket, så de kun kan se bagvæggen. Bag dem er der en ild, og mellem ilden og fangerne går mennesker med figurer. Fangerne ser kun skyggerne på væggen og tror, det er virkeligheden. Hvad sker der hvis én slipper fri og ser den rigtige verden udenfor?`,
                questions: [
                  "Hvad symboliserer skyggerne på væggen?",
                  "Hvad repræsenterer den frigivne fange?",
                  "Hvordan relaterer denne historie til vores forståelse af verden?",
                ],
              },
            },
            {
              title: "Aristoteles",
              text: `Aristoteles var elev hos Platon. Han var interesseret i naturen og undersøgte planter, dyr og stjerner. Han grundlagde logisk tænkning og kategoriserede alting i grupper.`,
              activity: {
                type: "sorting",
                instruction:
                  "Kategoriser disse ting, som Aristoteles ville gøre det",
                items: [
                  {
                    id: "menneske",
                    text: "Menneske",
                    category: "Levende væsen med fornuft",
                  },
                  {
                    id: "hund",
                    text: "Hund",
                    category: "Levende væsen uden fornuft",
                  },
                  { id: "sten", text: "Sten", category: "Ikke-levende ting" },
                  {
                    id: "træ",
                    text: "Træ",
                    category: "Levende væsen uden fornuft",
                  },
                  { id: "sol", text: "Sol", category: "Himmellegeme" },
                ],
              },
            },
          ],
        },
        quiz: {
          id: "græske-filosoffer-quiz",
          title: "De gamle grækere",
          questions: [
            {
              question: "Hvad er Sokrates kendt for?",
              options: [
                "At bygge Akropolis",
                "At skrive mange bøger",
                'At stille spørgsmål og sige "Jeg ved, at jeg intet ved"',
                "At være general i den græske hær",
              ],
              correctIndex: 2,
            },
            {
              question: "Hvad mente Platon var den virkelige verden?",
              options: [
                "Den fysiske verden vi kan se og røre",
                "Gudernes verden på Olympen",
                "De perfekte idéers verden",
                "Underverdenen",
              ],
              correctIndex: 2,
            },
            {
              question: "Hvad var Aristoteles særligt interesseret i?",
              options: [
                "Digtning og teater",
                "Naturen, logik og kategorisering",
                "Matematik og geometri",
                "Religion og myter",
              ],
              correctIndex: 1,
            },
          ],
        },
      },
      {
        id: "hvem-er-jeg",
        title: "Hvem er jeg?",
        description: "Udforsk spørgsmålet om identitet og selverkendelse",
        contentType: "story",
        xpReward: 70,
        content: `
            <p>Alberto forklarede Sofie om identitet. "Hvis jeg spørger dig, hvem du er, vil du måske fortælle mig dit navn eller beskrive, hvordan du ser ud. Men det er ikke alt, du er."</p>
            <p>"Men hvem er jeg så?" spurgte Sofie.</p>
            <p>"Du er dine tanker, dine følelser, dine erindringer og drømme. Du er en bevidsthed, som oplever verden, og som tænker over din egen eksistens."</p>
            <p>Filosoffen René Descartes sagde: "Jeg tænker, altså er jeg." Han mente, at selv hvis alt andet kunne betvivles, kunne han ikke tvivle på, at han tænkte og derfor eksisterede.</p>
            <p>Men er du den samme person, som du var som lille? Dine celler er udskiftet, dine tanker er forandret. Hvad gør, at du stadig er dig?</p>
            <p>Nogle filosoffer mener, at vores kontinuerlige erindring og sammenhængende historie er det, der giver os identitet gennem tid.</p>
          `,
        activity: {
          type: "reflection",
          questions: [
            "Hvis du vågnede op i morgen uden nogen erindringer, ville du så stadig være den samme person?",
            "Hvad er de tre vigtigste ting, der definerer, hvem du er?",
            "Hvordan påvirker andre mennesker din identitet?",
          ],
        },
        quiz: {
          id: "identitet-quiz",
          title: "Hvem er jeg?",
          questions: [
            {
              question:
                'Hvad mente Descartes, da han sagde "Jeg tænker, altså er jeg"?',
              options: [
                "At tænkning er det vigtigste i livet",
                "At selv hvis alt andet kunne betvivles, kunne han ikke tvivle på sin egen eksistens",
                "At man kun eksisterer, når man tænker aktivt",
                "At tænkning er et bevis på, at vi er levende",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad kan give os en følelse af identitet over tid?",
              options: [
                "Kun vores fysiske krop",
                "Kun vores navn",
                "Vores kontinuerlige erindringer og sammenhængende historie",
                "Kun vores job eller rolle i samfundet",
              ],
              correctIndex: 2,
            },
            {
              question:
                "Hvilken af disse er IKKE en del af din identitet ifølge filosofisk tænkning?",
              options: [
                "Dine tanker og følelser",
                "Dine erindringer",
                "Din bevidsthed",
                "Dit CPR-nummer",
              ],
              correctIndex: 3,
            },
          ],
        },
      },
    ],
  },
  {
    id: "etiske-dilemmaer",
    title: "Etiske Dilemmaer",
    description:
      "Udforsk hvad der er rigtigt og forkert, og hvordan vi bør handle",
    requiredLevel: 2,
    icon: "ethics",
    color: "#2E8B57",
    character: "etika",
    lessons: [
      {
        id: "hvad-er-etik",
        title: "Hvad er etik?",
        description: "Forstå hvad etik handler om, og hvorfor det er vigtigt",
        contentType: "story",
        xpReward: 50,
        content: `
            <p>Etik handler om spørgsmål om, hvad der er rigtigt og forkert, godt og dårligt. Det er læren om, hvordan vi bør handle og leve vores liv.</p>
            <p>Alberto fortalte Sofie: "Når vi tænker over etik, spørger vi: Hvad er et godt liv? Hvordan bør jeg behandle andre? Hvad er mine pligter og ansvar?"</p>
            <p>Gennem historien har filosoffer foreslået forskellige måder at tænke over etiske spørgsmål:</p>
            <ul>
              <li><strong>Konsekvensetik:</strong> Det rigtige er det, der giver de bedste konsekvenser</li>
              <li><strong>Pligtetik:</strong> Nogle handlinger er rigtige eller forkerte i sig selv, uanset konsekvenserne</li>
              <li><strong>Dydsetik:</strong> Vi bør udvikle gode karaktertræk og dyder</li>
            </ul>
          `,
        quiz: {
          id: "etik-intro-quiz",
          title: "Etikkens grundbegreber",
          questions: [
            {
              question: "Hvad handler etik om?",
              options: [
                "Jordens oprindelse",
                "Rigtigt og forkert, godt og dårligt",
                "Kroppens funktioner",
                "Stjerner og planeter",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad fokuserer konsekvensetik på?",
              options: [
                "At følge regler uanset hvad",
                "At udvikle gode karaktertræk",
                "At handle ud fra pligt",
                "At vurdere handlinger ud fra deres konsekvenser",
              ],
              correctIndex: 3,
            },
            {
              question:
                "Hvilken af disse er IKKE et centralt spørgsmål i etik?",
              options: [
                "Hvordan bør jeg behandle andre?",
                "Hvad er et godt liv?",
                "Hvad er mine pligter?",
                "Hvordan bliver jeg rig og berømt?",
              ],
              correctIndex: 3,
            },
          ],
        },
      },
      {
        id: "etiske-dilemmaer",
        title: "Etiske dilemmaer",
        description: "Tag stilling til svære etiske situationer",
        contentType: "interactive",
        xpReward: 60,
        content: {
          sections: [
            {
              title: "Sporvognsdilemmaet",
              text: `Et klassisk etisk dilemma er "sporvognsdilemmaet". Forestil dig, at en sporvogn er på vej mod fem mennesker, som vil blive dræbt, hvis den fortsætter. Du står ved et sporskifte og kan omdirigere sporvognen til et andet spor, hvor den kun vil dræbe én person. Hvad gør du?`,
              activity: {
                type: "choice",
                options: [
                  {
                    id: "omdirigere",
                    text: "Omdirigere sporvognen",
                    reasoning:
                      "Redder fem liv ved at ofre ét - konsekvensetisk tænkning",
                  },
                  {
                    id: "ikke-omdirigere",
                    text: "Ikke gøre noget",
                    reasoning:
                      "Jeg må ikke aktivt dræbe nogen - pligtetisk tænkning",
                  },
                ],
                discussion: `Dette dilemma viser forskellen mellem konsekvensetik (handle for at redde flest muligt) og pligtetik (det er forkert aktivt at dræbe). Begge synspunkter har gode argumenter.`,
              },
            },
            {
              title: "Venskabets dilemma",
              text: `Din bedste ven har snydt i en vigtig prøve og fået et resultat, der sikrer ham en plads på drømmestudiet. Du er den eneste, der ved det. Hvad gør du?`,
              activity: {
                type: "choice",
                options: [
                  {
                    id: "anmelde",
                    text: "Fortælle det til læreren",
                    reasoning:
                      "Det er uretfærdigt over for andre og snyd er forkert",
                  },
                  {
                    id: "tale-med-ven",
                    text: "Tale med din ven om at tilstå selv",
                    reasoning:
                      "Give vennen mulighed for selv at gøre det rigtige",
                  },
                  {
                    id: "tie",
                    text: "Tie stille",
                    reasoning: "Loyalitet over for vennen er vigtigst",
                  },
                ],
                discussion: `Dette dilemma handler om loyalitet kontra retfærdighed. Skal man være loyal over for en ven eller prioritere fairness og ærlighed?`,
              },
            },
            {
              title: "Det hvide løgn-dilemma",
              text: `Din bedsteforælders yndlingskat er blevet kørt over. De spørger, hvor katten er. Du ved, at sandheden vil gøre dem meget kede af det. Hvad siger du?`,
              activity: {
                type: "choice",
                options: [
                  {
                    id: "sandhed",
                    text: "Fortælle sandheden",
                    reasoning: "Ærlighed er altid vigtigst",
                  },
                  {
                    id: "hvidt-logn",
                    text: "Sige at katten er løbet væk",
                    reasoning: "Beskytte dem mod unødig smerte",
                  },
                  {
                    id: "omgaa",
                    text: "Omgå spørgsmålet",
                    reasoning: "Undgå både løgn og at såre dem direkte",
                  },
                ],
                discussion: `Dette viser konflikten mellem pligten til at være ærlig og ønsket om at beskytte andre mod smerte. Kant mente, at løgn altid er forkert, mens andre mener, at kærlighed kan retfærdiggøre hvide løgne.`,
              },
            },
          ],
        },
        quiz: {
          id: "etiske-dilemmaer-quiz",
          title: "Etiske valg",
          questions: [
            {
              question: "Hvad er et etisk dilemma?",
              options: [
                "En situation hvor der kun er én rigtig handling",
                "En situation hvor man skal vælge mellem forskellige handlinger, som alle har etiske implikationer",
                "En situation hvor man ikke behøver at tænke over konsekvenserne",
                "En situation hvor der ikke er nogen regler",
              ],
              correctIndex: 1,
            },
            {
              question:
                "I sporvognsdilemmaet, hvad repræsenterer de forskellige valg?",
              options: [
                "Forskellen mellem hurtige og langsomme beslutninger",
                "Forskellen mellem konsekvensetik og pligtetik",
                "Forskellen mellem modige og frygtelige valg",
                "Forskellen mellem gamle og nye etiske teorier",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad kan hjælpe os med at træffe etiske beslutninger?",
              options: [
                "At følge blindt, hvad andre gør",
                "At ignorere konsekvenserne",
                "At tænke over vores værdier og principper",
                "At altid vælge det nemmeste",
              ],
              correctIndex: 2,
            },
          ],
        },
      },
    ],
  },
  {
    id: "historiens-store-tanker",
    title: "Historiens Store Tænkere",
    description:
      "Mød de filosoffer gennem historien, som har formet vores tænkning",
    requiredLevel: 3,
    icon: "history",
    color: "#CD853F",
    character: "historikus",
    lessons: [
      {
        id: "middelalderens-thinkers",
        title: "Middelalderens tænkere",
        description:
          "Udforsk hvordan religion og filosofi mødtes i middelalderen",
        contentType: "story",
        xpReward: 50,
        content: `
            <p>I middelalderen var kristendommen meget stærk i Europa. Filosoffer forsøgte at forene den kristne tro med den græske filosofi.</p>
            <p>Den største af disse tænkere var Thomas Aquinas. Han mente, at både tro og fornuft var veje til sandheden. Han forsøgte at bevise Guds eksistens ved hjælp af filosofiske argumenter.</p>
            <p>Et af hans mest berømte argumenter er "det første årsags-argument": Alt har en årsag, men der kan ikke være uendelig mange årsager. Derfor må der være en første årsag - og det er Gud.</p>
            <p>Augustin, en anden vigtig tænker, mente at tid er en gåde. Han spurgte: "Hvad er tid? Hvis ingen spørger mig, ved jeg det. Hvis jeg skal forklare det til en, der spørger, ved jeg det ikke."</p>
          `,
        quiz: {
          id: "middelalder-quiz",
          title: "Middelalderens filosofi",
          questions: [
            {
              question: "Hvad forsøgte middelalderens filosoffer at gøre?",
              options: [
                "Bekæmpe religion",
                "Forene kristendommen med græsk filosofi",
                "Opfinde nye videnskaber",
                "Skrive digte",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad mente Thomas Aquinas om tro og fornuft?",
              options: [
                "De var i konflikt med hinanden",
                "Kun tro var vigtig",
                "Kun fornuft var vigtig",
                "Begge var veje til sandheden",
              ],
              correctIndex: 3,
            },
          ],
        },
      },
    ],
  },
];

export default learningPaths;
