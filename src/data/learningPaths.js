const learningPaths = [
  {
    id: "filosofiens-grundsten",
    title: "Filosofiens Grundsten",
    description:
      "Kom med Filo på opdagelse i filosofiens verden - hvor de store spørgsmål bliver stillet!",
    requiredLevel: 1,
    icon: "philosophy",
    color: "#8A2BE2",
    character: "filo",
    lessons: [
      {
        id: "hvad-er-filosofi",
        title: "Hvad er filosofi?",
        description:
          "Filo fortæller om filosofiens hemmeligheder og hvorfor vi spørger 'hvorfor?'",
        contentType: "story",
        xpReward: 50,
        content: `
            <p><strong>Filo sætter sig ved siden af dig og smiler stort:</strong></p>
            <p>"Hej! Jeg er Filo, og jeg elsker at tænke store tanker! Ved du hvad? Filosofi handler om at være nysgerrig - ligesom dig!"</p>
            
            <p>En dag fik Sofie et mystisk brev med spørgsmålet: "Hvem er du?" Det var ikke bare et navn, hun skulle svare - men hvem hun <em>virkelig</em> var indeni.</p>
            
            <p><strong>Filo forklarer:</strong> "Filosofi betyder 'kærlighed til visdom' på græsk. Det betyder, at vi elsker at lære og forstå verden omkring os!"</p>
            
            <p>Filosoffer er som detektiver, der løser mysterier om livet. Vi stiller spørgsmål som:</p>
            <ul>
              <li>🌍 Hvorfor findes verden?</li>
              <li>🤔 Hvem er jeg egentlig?</li>
              <li>⚖️ Hvad er rigtigt og forkert?</li>
              <li>💭 Hvordan kan jeg vide, at noget er sandt?</li>
            </ul>
            
            <p><strong>Filo griner:</strong> "Ligesom små børn spørger 'hvorfor' hele tiden, gør filosoffer det samme - bare med endnu større spørgsmål!"</p>
            
            <p>Det fede ved filosofi er, at der ikke altid er ét rigtigt svar. Vi tænker sammen og opdager nye måder at forstå verden på! 🌟</p>
          `,
        quiz: {
          id: "filosofi-intro-quiz",
          title: "Filos Quiz om Filosofi",
          questions: [
            {
              question: "Hvad betyder 'filosofi' på græsk?",
              options: [
                "At læse mange bøger",
                "Kærlighed til visdom",
                "At være meget klog",
                "At stille svære spørgsmål",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvorfor begyndte Sofie at filosofere?",
              options: [
                "Hendes lærer bad hende om det",
                "Hun læste en bog om filosofi",
                'Hun fik et mystisk brev med spørgsmålet "Hvem er du?"',
                "Hun så en film om filosofi",
              ],
              correctIndex: 2,
            },
            {
              question: "Hvad gør filosoffer ligesom små børn?",
              options: [
                "De leger hele dagen",
                "De spiser slik",
                "De ser tegnefilm",
                "De spørger 'hvorfor' hele tiden",
              ],
              correctIndex: 3,
            },
          ],
        },
      },
      {
        id: "de-gamle-graeske-filosoffer",
        title: "De gamle græske filosoffer",
        description:
          "Filo introducerer dig til filosofiens superhelte: Sokrates, Platon og Aristoteles",
        contentType: "interactive",
        xpReward: 60,
        content: {
          sections: [
            {
              title: "Sokrates - Spørgsmålenes Mester",
              text: `<strong>Filo bliver helt ophidset:</strong> "Nu skal du møde min helt - Sokrates! Han levede i Athen for ca. 2400 år siden og var som en filosofisk detektiv!"
              
              <p>Sokrates gik rundt i byen og stillede spørgsmål til alle. Han sagde noget meget klogt: "Jeg ved, at jeg intet ved." Det lyder måske mærkeligt, men det betød, at han var klog nok til at vide, hvor meget han stadig kunne lære!</p>
              
              <p><strong>Filo griner:</strong> "Forestil dig, at en voksen går rundt og spørger alle: 'Hvad er kærlighed? Hvad er mod? Hvad er retfærdighed?' Folk blev både irriterede og fascinerede!"</p>`,
              activity: {
                type: "dragdrop",
                instruction:
                  "Hjælp Filo med at matche filosoffen med hans særlige evne:",
                items: [
                  {
                    id: "sokrates",
                    text: "Sokrates",
                    description:
                      "Spørgsmålenes mester - vidste at han ikke vidste alt",
                  },
                  {
                    id: "platon",
                    text: "Platon",
                    description:
                      "Historiefortælleren - skrev ned hvad Sokrates sagde",
                  },
                  {
                    id: "aristoteles",
                    text: "Aristoteles",
                    description:
                      "Naturforskeren - undersøgte alt i verden omkring sig",
                  },
                ],
              },
            },
            {
              title: "Platon - Idéernes Verden",
              text: `<strong>Filo bliver mystisk:</strong> "Platon var Sokrates' elev og han havde en vild idé! Han mente, at alt hvad vi ser - borde, træer, mennesker - kun er skygger af de 'perfekte idéer'!"
              
              <p>Forestil dig den perfekte cirkel. Kan du tegne den? Nej, for alle cirkler vi tegner er lidt skæve. Men vi kan <em>tænke</em> den perfekte cirkel. Det kaldte Platon 'idéernes verden'.</p>`,
              activity: {
                type: "thought_experiment",
                instruction: "Filo fortæller Platons berømte hule-historie:",
                content: `<strong>Forestil dig:</strong> En gruppe mennesker sidder lænket i en mørk hule. De kan kun se bagvæggen. Bag dem brænder en ild, og mellem ilden og fangerne går folk med forskellige figurer. 
                
                <p>Fangerne ser kun <em>skyggerne</em> på væggen og tror, det er hele virkeligheden!</p>
                
                <p>Hvad hvis én person slipper fri og opdager den rigtige verden udenfor? Solskin, farver, rigtige ting!</p>`,
                questions: [
                  "Hvad tror du skyggerne på væggen forestiller?",
                  "Hvorfor ville det være svært for den frigivne at overbevise de andre?",
                  "Kan du tænke på noget i dit eget liv, der ligner denne historie?",
                ],
              },
            },
            {
              title: "Aristoteles - Alt-Vidende",
              text: `<strong>Filo klapper begejstret:</strong> "Aristoteles var Platons elev, men han var totalt anderledes! Hvor Platon drømte om idéer, ville Aristoteles undersøge ALT i den rigtige verden!"
              
              <p>Han studerede planter, dyr, stjerner, vejret - du kender det! Aristoteles opfandt også logik - måden vi tænker fornuftigt på.</p>
              
              <p><strong>Filo forklarer:</strong> "Han lavede grupper af alt: 'Ting der lever', 'Ting der ikke lever', 'Ting der tænker'. Ligesom når du rydder op på dit værelse!"</p>`,
              activity: {
                type: "sorting",
                instruction:
                  "Hjælp Aristoteles med at sortere tingene i grupper:",
                items: [
                  {
                    id: "menneske",
                    text: "Menneske",
                    category: "Levende væsen med hjerne til at tænke",
                  },
                  {
                    id: "hund",
                    text: "Hund",
                    category: "Levende væsen uden hjerne til at tænke",
                  },
                  { id: "sten", text: "Sten", category: "Ikke-levende ting" },
                  {
                    id: "træ",
                    text: "Træ",
                    category: "Levende væsen uden hjerne til at tænke",
                  },
                  { id: "sol", text: "Sol", category: "Himmellegeme" },
                ],
              },
            },
          ],
        },
        quiz: {
          id: "græske-filosoffer-quiz",
          title: "Filos Superhelte-Quiz",
          questions: [
            {
              question: "Hvad var Sokrates' superkraft?",
              options: [
                "At bygge smukke bygninger",
                "At skrive mange bøger",
                "At stille gode spørgsmål og erkende hvad han ikke vidste",
                "At være den stærkeste mand i Grækenland",
              ],
              correctIndex: 2,
            },
            {
              question: "Hvad mente Platon om 'idéernes verden'?",
              options: [
                "At vores verden er den eneste rigtige",
                "At der findes en verden med perfekte idéer bag vores verden",
                "At vi skal ignorere idéer",
                "At idéer er farlige",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad gjorde Aristoteles særligt?",
              options: [
                "Han skrev digte",
                "Han undersøgte naturen og lavede logiske systemer",
                "Han malede billeder",
                "Han dyrkede planter",
              ],
              correctIndex: 1,
            },
          ],
        },
      },
      {
        id: "hvem-er-jeg",
        title: "Hvem er jeg?",
        description:
          "Filo hjælper dig med at udforske det største spørgsmål af alle: Hvem er du egentlig?",
        contentType: "story",
        xpReward: 70,
        content: `
            <p><strong>Filo sætter sig tæt på og kigger dig direkte i øjnene:</strong></p>
            <p>"Nu kommer det største spørgsmål af alle! Hvem er du? Og jeg mener ikke bare dit navn eller hvordan du ser ud. Hvem er du <em>indeni</em>?"</p>
            
            <p><strong>Filo forklarer med begejstring:</strong> "Hvis jeg spørger dig, hvem du er, fortæller du måske dit navn eller beskriver dine øjne. Men det er kun din krop! Du er så meget mere!"</p>
            
            <p>"Du er dine tanker, dine følelser, dine minder og drømme. Du er den stemme indeni, som tænker akkurat nu, mens du læser dette!"</p>
            
            <p><strong>En klog filosof ved navn René Descartes sagde:</strong> "Jeg tænker, altså er jeg."</p>
            
            <p><strong>Filo forklarer:</strong> "Det betyder: Selv hvis alt andet var løgn - selv hvis du drømte eller var i Matrix - så kan du ikke tvivle på, at DU tænker. Og hvis du tænker, så findes du!"</p>
            
            <p><strong>Men her er det vilde spørgsmål:</strong> Er du den samme person, som du var, da du var 5 år gammel? 🤔</p>
            
            <p>Din krop er forandret, dine tanker er anderledes, du kan huske andre ting. Hvad er det så, der gør dig til... DIG?</p>
            
            <p><strong>Filo griner:</strong> "Nogle filosoffer mener, det er dine minder. Andre siger, det er din personlighed. Hvad tror du? Det er der ikke ét rigtigt svar på - og det er det fede ved filosofi!"</p>
          `,
        activity: {
          type: "reflection",
          questions: [
            "Hvis du vågnede i morgen og havde glemt alt, ville du så stadig være dig?",
            "Nævn tre ting, der gør dig til netop DIG og ikke en anden",
            "Hvordan påvirker dine venner og familie, hvem du er?",
          ],
        },
        quiz: {
          id: "identitet-quiz",
          title: "Filos Identitets-Quiz",
          questions: [
            {
              question: 'Hvad mente Descartes med "Jeg tænker, altså er jeg"?',
              options: [
                "At man kun eksisterer, når man læser bøger",
                "At selv hvis alt andet kan betvivles, kan man ikke tvivle på at man tænker og derfor eksisterer",
                "At tænkning er det vigtigste i livet",
                "At man skal tænke meget for at være klog",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad gør dig til DIG ifølge filosoffer?",
              options: [
                "Kun dit udseende",
                "Kun dit navn",
                "En kombination af dine minder, tanker, følelser og oplevelser",
                "Kun dit CPR-nummer",
              ],
              correctIndex: 2,
            },
            {
              question:
                "Hvorfor er spørgsmålet 'Hvem er jeg?' svært at svare på?",
              options: [
                "Fordi vi hele tiden forandrer os",
                "Fordi det er kedeligt",
                "Fordi lærere ikke kan lide spørgsmål",
                "Fordi det ikke er vigtigt",
              ],
              correctIndex: 0,
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
      "Følg med Etika ind i de svære valg - hvor der ikke altid er et klart rigtigt svar",
    requiredLevel: 2,
    icon: "ethics",
    color: "#2E8B57",
    character: "etika",
    lessons: [
      {
        id: "hvad-er-etik",
        title: "Hvad er etik?",
        description:
          "Etika forklarer hvorfor nogle valg er svære og hvordan vi kan tænke over rigtigt og forkert",
        contentType: "story",
        xpReward: 50,
        content: `
            <p><strong>Etika træder frem med et venligt, men alvorligt smil:</strong></p>
            <p>"Hej! Jeg er Etika, og jeg hjælper med de svære valg i livet. Har du nogensinde stået over for et valg, hvor du ikke vidste, hvad der var rigtigt?"</p>
            
            <p><strong>Etika forklarer:</strong> "Etik handler om spørgsmål som: Hvad er rigtigt og forkert? Hvordan skal vi behandle hinanden? Hvad er et godt liv?"</p>
            
            <p>Forestil dig disse situationer:</p>
            <ul>
              <li>🚲 Din ven låner din cykel uden at spørge - er det OK?</li>
              <li>🍰 Der er kun ét stykke kage tilbage - hvem skal have det?</li>
              <li>🐶 Du finder en hund på gaden - skal du tage den med hjem?</li>
            </ul>
            
            <p><strong>Etika bliver mere seriøs:</strong> "Filosoffer har tænkt over etik i tusindvis af år og fundet forskellige måder at tænke på:"</p>
            
            <p><strong>1. Konsekvens-tænkning:</strong> "Hvad sker der, hvis jeg gør sådan her? Hvad er det bedste resultat for flest mulige?"</p>
            
            <p><strong>2. Regel-tænkning:</strong> "Der er nogle ting, der altid er forkerte - som at lyve eller stjæle - uanset hvad der sker bagefter."</p>
            
            <p><strong>3. Karakter-tænkning:</strong> "Hvad ville en god person gøre? Hvordan kan jeg blive et bedre menneske?"</p>
            
            <p><strong>Etika smiler:</strong> "Det fede er, at vi kan bruge alle tre måder til at tænke over svære valg. Nogle gange er de enige, andre gange ikke!"</p>
          `,
        quiz: {
          id: "etik-intro-quiz",
          title: "Etikas Grundlæggende Quiz",
          questions: [
            {
              question: "Hvad handler etik om?",
              options: [
                "Hvordan planeter bevæger sig",
                "Rigtigt og forkert, godt og dårligt",
                "Matematik og regning",
                "Hvordan man laver mad",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad fokuserer 'konsekvens-tænkning' på?",
              options: [
                "At følge regler uanset hvad",
                "At være en god person",
                "At tænke på hvad der sker som resultat af vores handlinger",
                "At lytte til læreren",
              ],
              correctIndex: 2,
            },
            {
              question:
                "Hvilket af disse er IKKE et spørgsmål, som etik beskæftiger sig med?",
              options: [
                "Hvordan skal jeg behandle mine venner?",
                "Hvad er et godt liv?",
                "Hvordan bliver jeg rig og berømt?",
                "Hvad er mine ansvar over for andre?",
              ],
              correctIndex: 2,
            },
          ],
        },
      },
      {
        id: "etiske-dilemmaer",
        title: "Svære valg i hverdagen",
        description:
          "Etika tager dig med gennem nogle af de mest berømte etiske dilemmaer",
        contentType: "interactive",
        xpReward: 60,
        content: {
          sections: [
            {
              title: "Cykel-dilemmaet (Fra det berømte 'Togskins-dilemma')",
              text: `<strong>Etika bliver alvorlig:</strong> "Nu skal vi tale om et berømt etisk dilemma, men jeg gør det til noget, du bedre kan forstå."
              
              <p>"Forestil dig: Du cykler ned ad en bakke og ser fem mindre børn, der leger på cykelstien. Dine bremser virker ikke! Du vil ramme dem alle sammen."</p>
              
              <p>"Men du kan dreje til siden på en anden sti, hvor der kun er ét barn. Hvad gør du?"</p>`,
              activity: {
                type: "choice",
                options: [
                  {
                    id: "dreje",
                    text: "Dreje til siden og ramme det ene barn",
                    reasoning:
                      "Redder fem børn ved at ofre ét - tænker på det bedste resultat for flest",
                  },
                  {
                    id: "ikke-dreje",
                    text: "Fortsætte lige ud",
                    reasoning:
                      "Det føles forkert aktivt at vælge at skade nogen, selvom flere bliver skadet",
                  },
                ],
                discussion: `<strong>Etika forklarer:</strong> "Dette viser forskellen mellem to måder at tænke på. Den første siger: 'Red flest mulige!' Den anden siger: 'Det er forkert aktivt at skade nogen.' Begge har gode grunde - det er derfor, det er et dilemma!"`,
              },
            },
            {
              title: "Venskabs-dilemmaet",
              text: `<strong>Etika sukker:</strong> "Dette sker desværre i det virkelige liv. Din bedste ven har snydt til en vigtig prøve og fået topkarakter. Det sikrer ham en plads på det studie, han drømmer om. Du er den eneste, der ved det."`,
              activity: {
                type: "choice",
                options: [
                  {
                    id: "anmelde",
                    text: "Fortælle det til læreren",
                    reasoning:
                      "Det er unfair over for andre elever, og snyd er forkert",
                  },
                  {
                    id: "tale-med-ven",
                    text: "Tale med din ven om selv at tilstå",
                    reasoning:
                      "Give vennen chancen for selv at gøre det rigtige",
                  },
                  {
                    id: "tie",
                    text: "Ikke sige noget",
                    reasoning: "Loyalitet over for vennen er vigtigst",
                  },
                ],
                discussion: `<strong>Etika nikker forstående:</strong> "Loyalitet kontra fairness - et af de sværeste dilemmaer! Skal du være loyal over for din ven eller fair over for alle andre? Der er ikke ét rigtigt svar, men du kan tænke over: Hvad ville der ske, hvis alle gjorde som dig?"`,
              },
            },
            {
              title: "Den Hvide Løgn",
              text: `<strong>Etika ser trist ud:</strong> "Din bedsteforælder spørger om deres elskede kat, men katten blev kørt over i morges. Du ved, at sandheden vil gøre dem enormt kede af det, og de har ikke været raske på det seneste."`,
              activity: {
                type: "choice",
                options: [
                  {
                    id: "sandhed",
                    text: "Fortælle sandheden",
                    reasoning:
                      "Ærlighed er altid vigtigst, selv når det gør ondt",
                  },
                  {
                    id: "hvidt-logn",
                    text: "Sige at katten er løbet væk",
                    reasoning: "Beskytte dem mod unødvendig smerte",
                  },
                  {
                    id: "omgaa",
                    text: "Sige: 'Lad os tale om det senere'",
                    reasoning: "Undgå både løgn og at såre dem direkte nu",
                  },
                ],
                discussion: `<strong>Etika smiler mildt:</strong> "En filosof ved navn Kant mente, at løgn ALTID er forkert. Andre mener, at kærlighed nogle gange kan retfærdiggøre små løgne. Hvad tænker du? Findes der 'gode løgne'?"`,
              },
            },
          ],
        },
        quiz: {
          id: "etiske-dilemmaer-quiz",
          title: "Etikas Dilemma-Quiz",
          questions: [
            {
              question: "Hvad er et etisk dilemma?",
              options: [
                "En situation hvor der kun er én rigtig handling",
                "En situation hvor du skal vælge mellem flere handlinger, og alle valg har både gode og dårlige sider",
                "En situation hvor der ikke er nogen regler",
                "En situation hvor du ikke behøver at tænke",
              ],
              correctIndex: 1,
            },
            {
              question: "I cykel-dilemmaet, hvad viser de forskellige valg?",
              options: [
                "Forskellen mellem hurtige og langsomme beslutninger",
                "Forskellen mellem at tænke på resultater vs. at tænke på regler",
                "Forskellen mellem modige og frygtelige valg",
                "Forskellen mellem unge og gamle menneskers valg",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad kan hjælpe os med at træffe etiske beslutninger?",
              options: [
                "At gøre, hvad alle andre gør",
                "At ignorere konsekvenserne",
                "At tænke over vores værdier og hvad der er vigtigt for os",
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
      "Rejse gennem tiden med Historikus og mød de vise mennesker, der formede vores verden",
    requiredLevel: 3,
    icon: "history",
    color: "#CD853F",
    character: "historikus",
    lessons: [
      {
        id: "middelalderens-thinkers",
        title: "Middelalderens vise mennesker",
        description:
          "Historikus tager dig med til en tid, hvor tro og tænkning mødtes på fascinerende måder",
        contentType: "story",
        xpReward: 50,
        content: `
            <p><strong>Historikus træder frem i en lang kappe og smiler mysterisk:</strong></p>
            <p>"Velkommen, unge tidsrejsende! Jeg er Historikus, og i dag rejser vi tilbage til middelalderen - en tid omkring år 1000-1400, hvor store tænkere forsøgte at forstå verden!"</p>
            
            <p><strong>Historikus gestikulerer storslået:</strong> "I Europa var kristendommen meget vigtig på den tid. Men de kloge mennesker ville også bruge deres hjerner til at tænke! Så de spurgte: 'Kan vi både have tro OG bruge fornuft?'"</p>
            
            <p><strong>Den største af disse tænkere var Thomas Aquinas:</strong></p>
            <p>"Thomas var som en bro mellem hjerte og hjerne! Han mente, at både følelser/tro og logik/tænkning kunne lede os til sandheden."</p>
            
            <p><strong>Historikus bliver spændende:</strong> "Thomas forsøgte endda at bevise Guds eksistens med logik! Han sagde: 'Alt har en årsag, ikke? Din fødsel havde en årsag - dine forældre. Deres fødsel havde en årsag - deres forældre. Men der kan ikke være uendelige årsager! Så der må være en FØRSTE årsag - og det kalder vi Gud.'"</p>
            
            <p><strong>En anden klog mand, Augustin, var fascineret af tiden:</strong></p>
            <p>"Han sagde noget meget interessant: 'Hvad er tid? Hvis ingen spørger mig, ved jeg det. Men hvis jeg skal forklare en anden person hvad tid er... så ved jeg det pludselig ikke!'"</p>
            
            <p><strong>Historikus griner:</strong> "Har du nogensinde prøvet det samme? At vide noget helt sikkert, indtil du skal forklare det til andre?"</p>
            
            <p>I middelalderen byggede de også kæmpe katedraler og universiteter - steder hvor mennesker kunne både tilbede og tænke! 🏰</p>
          `,
        quiz: {
          id: "middelalder-quiz",
          title: "Historikus' Tidsrejse-Quiz",
          questions: [
            {
              question: "Hvad forsøgte middelalderens tænkere at gøre?",
              options: [
                "Bekæmpe religion fuldstændigt",
                "Kombinere kristendom og filosofisk tænkning",
                "Opfinde nye maskiner",
                "Skrive romaner",
              ],
              correctIndex: 1,
            },
            {
              question: "Hvad mente Thomas Aquinas om tro og fornuft?",
              options: [
                "De var i konstant krig med hinanden",
                "Kun tro var vigtig",
                "Kun fornuft var vigtig",
                "Begge kunne lede os til sandhed på hver deres måde",
              ],
              correctIndex: 3,
            },
            {
              question: "Hvad sagde Augustin om tiden?",
              options: [
                "At tid ikke eksisterer",
                "At han vidste præcis hvad tid var",
                "At han vidste hvad tid var, indtil han skulle forklare det",
                "At tid kun eksisterer om natten",
              ],
              correctIndex: 2,
            },
          ],
        },
      },
    ],
  },
];

export default learningPaths;
