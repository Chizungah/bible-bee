import { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import bgImage from "./assets/background.jpg";

const DIFF_BG = { Easy: "#F9B800", Medium: "#3D9BE9", Hard: "#F03E5F" };
const DIFFICULTIES = ["Easy", "Medium", "Hard"];

const HS_CATEGORIES  = ["The Pentateuch", "Epistles", "The Gospels", "Major Prophets", "Minor Prophets", "General Knowledge"];
const UNI_CATEGORIES = ["The Gospels", "Major Prophets", "Minor Prophets", "The Pentateuch", "General Knowledge", "Apocalyptic Books"];

const HS_Q_COUNT  = { Easy: 6, Medium: 8, Hard: 6 };
const UNI_Q_COUNT = { Easy: 7, Medium: 7, Hard: 7 };

const HS_CAT_Q_COUNT = {
  "The Pentateuch":    { Easy: 6, Medium: 8, Hard: 6 },
  "Epistles":          { Easy: 6, Medium: 8, Hard: 6 },
  "The Gospels":       { Easy: 6, Medium: 6, Hard: 6 },
  "Major Prophets":    { Easy: 6, Medium: 8, Hard: 6 },
  "Minor Prophets":    { Easy: 7, Medium: 7, Hard: 6 },
  "General Knowledge": { Easy: 8, Medium: 8, Hard: 6 },
};
const UNI_CAT_Q_COUNT = {
  "The Gospels":       { Easy: 7, Medium: 7, Hard: 7 },
  "Major Prophets":    { Easy: 6, Medium: 7, Hard: 7 },
  "Minor Prophets":    { Easy: 7, Medium: 8, Hard: 7 },
  "The Pentateuch":    { Easy: 7, Medium: 7, Hard: 7 },
  "General Knowledge": { Easy: 7, Medium: 7, Hard: 7 },
  "Apocalyptic Books": { Easy: 7, Medium: 7, Hard: 7 },
};

const HS_QUESTIONS = {
  "The Pentateuch": {
    Easy: [
      { q: "Where did Moses die?", a: "Mount Nebo / in Moab" },
      { q: "How many days did it rain during the flood in Noah's time?", a: "40" },
      { q: "What were the two trees in the middle of the Garden of Eden?", a: "The tree of life and the tree of the knowledge of good and evil" },
      { q: "Which of the ten plagues came last, breaking Pharaoh's resistance and leading to the Exodus?", a: "Death of the firstborn" },
      { q: "Name the five books contained in the Pentateuch.", a: "Genesis, Exodus, Leviticus, Deuteronomy, Numbers" },
      { q: "What object represented God's presence in the Tabernacle?", a: "Ark of the Covenant" },
    ],
    Medium: [
      { q: "What was the name of Hagar's son, and what did it mean?", a: "Ishmael | means 'God hears'" },
      { q: "What is the 9th plague that God brought upon Egypt when Pharaoh refused to let the Israelites go?", a: "Darkness" },
      { q: "Numbers gets its name from two census counts of the Israelites. What was being counted?", a: "All men able to serve in the army" },
      { q: "What tribe was set apart for priestly service?", a: "Levi" },
      { q: "How old was Abraham when Isaac was born?", a: "One hundred" },
      { q: "Who was Noah's grandfather?", a: "Methuselah" },
      { q: "In Exodus 19, what covered Mount Sinai when God descended upon it?", a: "Smoke" },
      { q: "How many years did Jacob serve Laban for Rachel?", a: "14 years" },
    ],
    Hard: [
      { q: "What is the Hebrew term for the first five books of the Bible, and what does it mean?", a: "Torah, meaning 'law' or 'instruction'" },
      { q: "What happened during the Levitical Year of Jubilee?", a: "Land is returned to original owners and slaves freed" },
      { q: "What is the total number of commandments God gave the Israelites in the book of Leviticus?", a: "247" },
      { q: "In Leviticus 10, who offered unauthorized fire before the Lord and died?", a: "Nadab and Abihu" },
      { q: "What did Jacob vow to give God if God brought him safely home from Haran?", a: "A tenth (tithe)" },
      { q: "Who was swallowed by the earth after rebelling against Moses?", a: "Korah" },
    ],
  },
  "Epistles": {
    Easy: [
      { q: "Who wrote the majority of the New Testament epistles?", a: "Paul" },
      { q: "Which epistle contains the famous 'love chapter' beginning with 'If I speak in the tongues of men and of angels'?", a: "1 Corinthians" },
      { q: "Which epistle opens with 'That which was from the beginning, which we have heard, which we have seen with our eyes'?", a: "1 John" },
      { q: "Which epistle teaches that faith without works is dead?", a: "James" },
      { q: "In Ephesians 6, which piece of armor is able to extinguish 'all the flaming arrows of the evil one'?", a: "The shield of faith" },
      { q: "In which epistle do we find 'whatever is true, whatever is noble...think about such things'?", a: "Philippians" },
    ],
    Medium: [
      { q: "How many letters in the New Testament are attributed to the Apostle Paul?", a: "13" },
      { q: "What epistle was written to a slave owner about forgiveness?", a: "Philemon" },
      { q: "In 1 Corinthians 15, Paul says that if Christ has not been raised, your faith is what?", a: "Futile / Useless / Vain" },
      { q: "Which two individuals are the Pastoral Epistles addressed to?", a: "Timothy and Titus" },
      { q: "Which epistle warns against falling away after knowing the truth?", a: "Hebrews" },
      { q: "Which epistle describes Scripture as God-breathed?", a: "2 Timothy" },
      { q: "Which epistle teaches that Christ is the image of the invisible God?", a: "Colossians" },
      { q: "Which epistle warns that teachers will be judged more strictly?", a: "James" },
    ],
    Hard: [
      { q: "In Romans 9–11, what metaphor does Paul use to explain the relationship between Jewish and Gentile believers?", a: "An Olive Tree" },
      { q: "Which epistle identifies Jesus as a high priest in the order of Melchizedek?", a: "Hebrews" },
      { q: "In 2 Corinthians, what does God tell Paul when he pleads for his 'thorn in the flesh' to be removed?", a: "'My grace is sufficient for you, for my power is made perfect in weakness'" },
      { q: "In which epistle does Paul strongly condemn the church for embracing a false Gospel?", a: "Galatians" },
      { q: "In Romans 6, what act does Paul say symbolically represents burial with Christ?", a: "Baptism" },
      { q: "Which epistle describes Jesus as the power of God and the Wisdom of God?", a: "1 Corinthians (1:24)" },
    ],
  },
  "The Gospels": {
    Easy: [
      { q: "What was Jesus' occupation before His ministry?", a: "Carpenter" },
      { q: "Which disciples were fishermen when Jesus called them?", a: "Peter and Andrew" },
      { q: "Which disciple was formerly a tax collector?", a: "Matthew" },
      { q: "Which Gospel presents Jesus as the suffering servant?", a: "Mark" },
      { q: "Which Gospel begins with the genealogy of Jesus?", a: "Matthew" },
      { q: "Which Gospel is the shortest?", a: "Mark" },
    ],
    Medium: [
      { q: "In the Sermon on the Mount, what did Jesus say peacemakers will be called?", a: "Sons of God" },
      { q: "Which Gospel does not include a birth narrative of Jesus?", a: "Mark" },
      { q: "In which Gospel does Jesus say, 'I am the bread of life'?", a: "John" },
      { q: "What Roman official sentenced Jesus to crucifixion?", a: "Pontius Pilate" },
      { q: "What miracle immediately followed Jesus calming the storm?", a: "Healing the demon-possessed man" },
      { q: "What question did Jesus ask Peter three times after the resurrection?", a: "'Do you love me?'" },
    ],
    Hard: [
      { q: "What is the name of the Roman officer whose ear Peter cut off at Jesus' arrest?", a: "Malchus" },
      { q: "Which Gospel records Jesus' statement, 'Destroy this temple, and I will raise it in three days'?", a: "John" },
      { q: "In which Gospel are the Beatitudes accompanied by corresponding 'woes'?", a: "Luke" },
      { q: "Which Gospel records Jesus being silent before his accusers?", a: "Mark" },
      { q: "Which Gospel uniquely records Jesus' prayer in Gethsemane strengthened by an angel?", a: "Luke" },
      { q: "Which Gospel alone records the parable of the Rich Man and Lazarus?", a: "Luke" },
    ],
  },
  "Major Prophets": {
    Easy: [
      { q: "Which prophet is known as the 'weeping prophet'?", a: "Jeremiah" },
      { q: "Which book mourns the destruction of Jerusalem?", a: "Lamentations" },
      { q: "Which prophet prophesied beside the Chebar River?", a: "Ezekiel" },
      { q: "Which prophet was taken captive to Babylon as a youth?", a: "Daniel" },
      { q: "Who warned Judah repeatedly before the Babylonian exile?", a: "Jeremiah" },
      { q: "Which Major Prophet contains many prophecies about the Messiah?", a: "Isaiah" },
    ],
    Medium: [
      { q: "Which prophet foretold a suffering servant who would bear sin?", a: "Isaiah" },
      { q: "Which prophet wrote about a new covenant written on the heart?", a: "Jeremiah" },
      { q: "Which prophet had a vision of dry bones coming to life?", a: "Ezekiel" },
      { q: "Which king did Daniel serve during the lion's den incident?", a: "Darius" },
      { q: "Which prophet warned against trusting political alliances instead of God?", a: "Isaiah" },
      { q: "Which prophet was forbidden to marry as a sign to the people?", a: "Jeremiah" },
      { q: "Which prophet prophesied about successive world empires?", a: "Daniel" },
      { q: "Which prophet received visions while praying and fasting?", a: "Daniel" },
    ],
    Hard: [
      { q: "Which prophet saw seraphim proclaiming God's holiness?", a: "Isaiah" },
      { q: "What title does God repeatedly use for Ezekiel?", a: "Son of man" },
      { q: "Which prophet spoke of the Lord's word accomplishing his purpose like rain?", a: "Isaiah" },
      { q: "Which prophet was struck mute until God allowed him to speak?", a: "Ezekiel" },
      { q: "Which book affirms that God's mercies are new every morning?", a: "Lamentations" },
      { q: "Which prophet was commanded to eat a scroll as part of his calling?", a: "Ezekiel" },
    ],
  },
  "Minor Prophets": {
    Easy: [
      { q: "Which minor prophet was swallowed by a great fish?", a: "Jonah" },
      { q: "Which prophet was commanded to marry an unfaithful wife as a symbol of Israel?", a: "Hosea" },
      { q: "Which book ends with the question about 120,000 people who do not know their right from left?", a: "Jonah" },
      { q: "Which prophet called Israel to 'do justice, love mercy, and walk humbly with God'?", a: "Micah" },
      { q: "Which book condemns Israel for empty worship without obedience?", a: "Amos" },
      { q: "Which prophet encouraged the rebuilding of the temple after the exile?", a: "Haggai" },
      { q: "Which prophet declared that 'the just shall live by faith'?", a: "Habakkuk" },
    ],
    Medium: [
      { q: "Which prophet questioned God about why the wicked prosper?", a: "Habakkuk" },
      { q: "Which prophet delivered a message entirely against the nation of Edom?", a: "Obadiah" },
      { q: "Which prophet foretold the birthplace of the Messiah?", a: "Micah" },
      { q: "Which prophet proclaimed God's judgment on Assyria and Nineveh?", a: "Nahum" },
      { q: "Which prophet warned that the 'Day of the Lord' was near?", a: "Zephaniah" },
      { q: "Which prophet used visions of lamps and olive trees?", a: "Zechariah" },
      { q: "Which prophet condemned priests for dishonoring God's sacrifices?", a: "Malachi" },
    ],
    Hard: [
      { q: "What price did Hosea pay to buy back his wife from prostitution?", a: "15 pieces of silver plus some barley" },
      { q: "Which prophet described Israel as a vine yielding bad fruit?", a: "Hosea" },
      { q: "Which prophet foresaw living water flowing from Jerusalem?", a: "Zechariah" },
      { q: "Which prophet rebuked the people for neglecting God's house while building their own?", a: "Haggai" },
      { q: "Which prophet describes God as slow to anger yet powerful?", a: "Nahum" },
      { q: "Which prophet warned not to boast over Israel's downfall?", a: "Obadiah" },
    ],
  },
  "General Knowledge": {
    Easy: [
      { q: "How many books are in the Old Testament?", a: "39" },
      { q: "What is Jesus' final commandment before his ascension?", a: "The Great Commission / Make Disciples" },
      { q: "What event marks the coming of the Holy Spirit to the church?", a: "Pentecost" },
      { q: "Who was the oldest man in the Bible?", a: "Methuselah" },
      { q: "Who is attributed as the author of Genesis?", a: "Moses" },
      { q: "Which book comes immediately before the Psalms?", a: "Job" },
      { q: "Which sea did Jesus calm during the storm?", a: "Sea of Galilee" },
      { q: "What is the ability to know right from wrong?", a: "Wisdom" },
    ],
    Medium: [
      { q: "What language was most of the Old Testament originally written in?", a: "Hebrew" },
      { q: "Which language was most of the New Testament originally written in?", a: "Greek" },
      { q: "Which book describes the early church after Jesus' ascension?", a: "Acts" },
      { q: "Which Gospel was written by a doctor?", a: "Luke" },
      { q: "On which continent did most biblical events occur?", a: "Asia" },
      { q: "In which country was Jesus born?", a: "Judea" },
      { q: "Which Old Testament book contains the longest chapter in the Bible?", a: "Psalms" },
      { q: "Which book records Israel's conquest of Canaan?", a: "Joshua" },
    ],
    Hard: [
      { q: "Which book of the Bible does not mention God by name?", a: "Esther" },
      { q: "What Assyrian capital was destroyed as prophesied by Nahum?", a: "Nineveh" },
      { q: "Which two Old Testament books cover the same historical period from different perspectives?", a: "Kings and Chronicles" },
      { q: "Which biblical figure bridges the period of the judges and the monarchy?", a: "Samuel" },
      { q: "Which prophet lived during the reigns of four kings of Judah?", a: "Isaiah" },
      { q: "Which New Testament book does not identify its author by name?", a: "Hebrews" },
    ],
  },
};

const UNI_QUESTIONS = {
  "The Gospels": {
    Easy: [
      { q: "Who declared, 'Behold, the Lamb of God who takes away the sin of the world'?", a: "John the Baptist" },
      { q: "In which town did Jesus turn water into wine during a wedding?", a: "Cana" },
      { q: "Who was the first disciple to reach Jesus' empty tomb?", a: "Peter" },
      { q: "At which sea did Jesus teach the crowds from a boat?", a: "Sea of Galilee" },
      { q: "What title did the demons use when addressing Jesus?", a: "Son of God" },
      { q: "Where did Jesus grow up?", a: "Nazareth" },
      { q: "In which city was Jesus crucified?", a: "Jerusalem" },
    ],
    Medium: [
      { q: "Who publicly recognized Jesus as the 'Lamb of God'?", a: "John the Baptist" },
      { q: "What title did Peter confess Jesus to be at Caesarea Philippi?", a: "Christ" },
      { q: "Who asked, 'What is truth?' during Jesus' trial?", a: "Pilate" },
      { q: "In which region did Jesus heal the man possessed by many demons?", a: "Decapolis" },
      { q: "What event immediately followed Jesus' baptism in the Jordan?", a: "Temptation" },
      { q: "What crime was Barabbas imprisoned for?", a: "Insurrection" },
      { q: "Which Gospel uniquely records the parable of the Good Samaritan?", a: "Luke" },
    ],
    Hard: [
      { q: "Which Gospels do not record Jesus' birth narrative?", a: "John & Mark" },
      { q: "Which Gospel records Jesus weeping over Jerusalem?", a: "Luke" },
      { q: "What is the name of the woman who anointed Jesus' feet with perfume and wiped them with her hair?", a: "Mary of Bethany" },
      { q: "Where did Jesus ascend into heaven?", a: "Bethany" },
      { q: "Who said, 'Lord, to whom shall we go? You have the words of eternal life'?", a: "Peter" },
      { q: "Which Gospel records Jesus writing on the ground when the woman caught in adultery was brought to Him?", a: "John" },
      { q: "Which Gospel records the tearing of the temple curtain at the moment of Jesus' death?", a: "Matthew" },
    ],
  },
  "Major Prophets": {
    Easy: [
      { q: "What city's fall is mourned using structured poetic laments describing abandonment and sorrow?", a: "Jerusalem" },
      { q: "List the five major prophetic books.", a: "Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel" },
      { q: "Which book contains the phrase 'Great is Your faithfulness'?", a: "Lamentations" },
      { q: "Which prophet refused royal food in Babylon?", a: "Daniel" },
      { q: "Which prophet's visions include strange living creatures?", a: "Ezekiel" },
      { q: "Which book responds to suffering by reaffirming God's compassion?", a: "Lamentations" },
      { q: "Which prophet describes Israel as God's vineyard?", a: "Isaiah" },
    ],
    Medium: [
      { q: "In Jeremiah, what object was buried and later spoiled to represent corrupted national pride?", a: "Linen belt" },
      { q: "Which prophet saw visions of wheels within wheels?", a: "Ezekiel" },
      { q: "Which prophet wrote letters to the exiles in Babylon?", a: "Jeremiah" },
      { q: "Which prophet wrote during the reigns of Judah's last kings?", a: "Jeremiah" },
      { q: "Which prophet warned Judah not to rely on Egypt for help?", a: "Isaiah" },
      { q: "Which prophet saw God's throne supported by cherubim?", a: "Ezekiel" },
      { q: "Which prophet describes Israel as God's vineyard?", a: "Isaiah" },
    ],
    Hard: [
      { q: "Which prophet purchased a field while Jerusalem was under siege?", a: "Jeremiah" },
      { q: "In Daniel, what did the inscription say announcing the end of Belshazzar's kingdom?", a: "Mene, Mene, Tekel, Parsin / Peres" },
      { q: "Which prophet dictated his prophecies to a scribe?", a: "Jeremiah" },
      { q: "Which prophet describes God calling Cyrus by name?", a: "Isaiah" },
      { q: "Which prophet speaks of sealed visions until the time of the end?", a: "Daniel" },
      { q: "What animal symbol represented a lopsided empire in an apocalyptic vision?", a: "Bear" },
      { q: "Which prophet saw a vision of a new temple during the Babylonian exile?", a: "Ezekiel" },
    ],
  },
  "Minor Prophets": {
    Easy: [
      { q: "In the book of Joel, what disaster invaded Judah and prompted the prophet's call to repentance?", a: "Locusts" },
      { q: "What great city fasted and turned from violence after receiving a warning of destruction?", a: "Nineveh" },
      { q: "What was the name of the promiscuous woman that Hosea married?", a: "Gomer" },
      { q: "What was the name of Gomer and Hosea's first son?", a: "Jezreel" },
      { q: "How many Minor Prophets appear in the Bible?", a: "12" },
      { q: "Name the book which records the famous verse, “My people are destroyed for lack of knowledge”?", a: "Hosea" },
      { q: "Which book of the Minor Prophets is addressed entirely to a foreign nation?", a: "Obadiah" },
    ],
    Medium: [
      { q: "Which prophet proclaimed the downfall of Nineveh after its earlier repentance?", a: "Nahum" },
      { q: "Which minor prophet records a dialogue questioning God's justice?", a: "Habakkuk" },
      { q: "Which book presents messianic imagery involving a humble king?", a: "Zechariah" },
      { q: "Which prophet ministered during the reign of King Josiah?", a: "Zephaniah" },
      { q: "Which prophet announces judgment on Assyria using vivid poetry?", a: "Nahum" },
      { q: "In Zechariah 7, what practice was rejected as meaningless without obedience?", a: "Fasting" },
      { q: "Who had children symbolically named to represent broken covenant relationship?", a: "Hosea" },
    ],
    Hard: [
      { q: "What does Hosea's daughter's name, Lo-Ruhama, mean?", a: "Not loved" },
      { q: "What ethical triad summarizes God's covenantal expectations in Micah 6:8?", a: "Justice, mercy, humility" },
      { q: "Which minor prophet contains no direct call to repentance for its audience?", a: "Obadiah" },
      { q: "Which prophet famously states that 'the righteous shall live by faith'?", a: "Habakkuk" },
      { q: "Which prophet presents multiple night visions interpreted by an angelic guide?", a: "Zechariah" },
      { q: "Which prophet denounces Israel's perception of divine election without ethical responsibility?", a: "Amos" },
      { q: "Which prophet describes God as both avenger and refuge in the same oracle?", a: "Nahum" },
    ],
  },
  "The Pentateuch": {
    Easy: [
      { q: "What did God create on the first day?", a: "Light" },
      { q: "How many people entered the ark with Noah?", a: "Eight" },
      { q: "Who wrote the law and read it to Israel before entering Canaan?", a: "Moses" },
      { q: "What structure did God instruct Israel to build so that He can dwell among them?", a: "The Tabernacle" },
      { q: "Which book of the Pentateuch focuses most on laws, sacrifices, and holiness?", a: "Leviticus" },
      { q: "What object did Jacob set up as a memorial at Bethel?", a: "Stone pillar" },
      { q: "Which tribe of Israel was assigned priestly duties?", a: "Levi" },
    ],
    Medium: [
      { q: "Which animal was central to Israel's sacrifices?", a: "Lamb" },
      { q: "How old was Noah when the flood began?", a: "Six hundred" },
      { q: "What was the third plague God sent on Pharaoh and Egypt?", a: "Gnats (or lice)" },
      { q: "What was the purpose of the Passover meal?", a: "Remembrance of deliverance" },
      { q: "Why did Moses strike the rock at Meribah?", a: "Anger" },
      { q: "Which commandment deals with honoring parents?", a: "Fifth" },
      { q: "Which of Joseph's brothers attempted to save him when his siblings wanted to kill him?", a: "Reuben" },
    ],
    Hard: [
      { q: "What was the name of the desert where Israel received manna?", a: "Desert of Sin" },
      { q: "What specific material covered the Ark of the Covenant?", a: "Gold" },
      { q: "What was the name of the mountain where Aaron died?", a: "Hor" },
      { q: "What judgment did Miriam receive for speaking against Moses?", a: "Leprosy" },
      { q: "What was the name of the king of Moab who summoned Balaam?", a: "Balak" },
      { q: "What is the name of the place where Jacob wrestled with God?", a: "Peniel" },
      { q: "What specific sin did Reuben commit that caused him to lose his birthright?", a: "Slept with his father's concubine" },
    ],
  },
  "General Knowledge": {
    Easy: [
      { q: "On which three continents was the Bible written?", a: "Asia, Africa and Europe" },
      { q: "Who declared, 'Here am I; send me,' during a divine commissioning?", a: "Isaiah" },
      { q: "What commandment teaches, 'You shall not steal'?", a: "The Eighth Commandment" },
      { q: "Which biblical era comes immediately before the monarchy in Israel?", a: "Period of the Judges" },
      { q: "Which New Testament book contains the longest continuous historical narrative?", a: "Acts" },
      { q: "Which biblical book combines narrative, genealogy, poetry, and covenant themes?", a: "Genesis" },
      { q: "What is the shortest book in the Old Testament?", a: "Obadiah" },
    ],
    Medium: [
      { q: "Which king of Judah found the Book of the Law during temple repairs?", a: "King Josiah" },
      { q: "Which city is symbolically called 'the great prostitute' in Revelation?", a: "Babylon" },
      { q: "Which city functioned as a major center for early Gentile Christianity?", a: "Antioch" },
      { q: "Which empire followed Babylon as the dominant world power in the Bible?", a: "Persia" },
      { q: "Which biblical genre dominates the books of Isaiah and Jeremiah?", a: "Prophetic poetry" },
      { q: "Which book details the rebuilding of Jerusalem's walls after exile?", a: "Nehemiah" },
      { q: "Which letter addresses division and disorder within a local church?", a: "1 Corinthians" },
    ],
    Hard: [
      { q: "Which Gospel is generally regarded as written for a Jewish audience?", a: "Matthew" },
      { q: "Which body of water represents the lowest geographical point mentioned in Scripture?", a: "Dead Sea" },
      { q: "Who said, 'Even if He slays me, yet will I trust Him'?", a: "Job" },
      { q: "To which tribe did Samson belong?", a: "Dan" },
      { q: "Approximately how long did King Solomon reign?", a: "Forty years" },
      { q: "Which two nations were the first to adopt Christianity as an official state religion?", a: "Armenia and Aksum (Ethiopia)" },
      { q: "What is the earliest known translation of the Hebrew Scriptures into Greek called?", a: "Septuagint" },
    ],
  },
  "Apocalyptic Books": {
    Easy: [
      { q: "What are the two primary apocalyptic books of the Bible?", a: "Daniel and Revelation" },
      { q: "On what island did John receive his visions?", a: "Patmos" },
      { q: "How many beasts does Daniel see rising from the sea in his vision?", a: "Four" },
      { q: "What number is associated with the beast in Revelation?", a: "666" },
      { q: "Which foreign empire ruled during Daniel's lifetime?", a: "Babylon" },
      { q: "How many churches received a letter from Jesus in Revelation?", a: "7" },
      { q: "What city descends from heaven as God's dwelling with humanity?", a: "New Jerusalem" },
    ],
    Medium: [
      { q: "What do the four beasts in Daniel 7 represent?", a: "Kingdoms" },
      
      { q: "Which angel explains Daniel's visions to him?", a: "Gabriel" },
      { q: "In Revelation, what animal imagery combined brutality and authority in the sea-rising vision?", a: "Beast" },
      { q: "How many horns appear on the fourth beast in Daniel's vision?", a: "Ten" },
      { q: "In Revelation, how many months symbolized oppression and endurance of the faithful?", a: "Forty-two months" },
      { q: "What number symbolized a sealed remnant drawn from all tribes?", a: "144,000" },
      { q: "Which book explicitly commands the sealing of visions until the time of the end?", a: "Daniel" },
    ],
    Hard: [
      { q: "What symbolic garment represented righteousness granted to the redeemed?", a: "White robes" },
      { q: "In Daniel 3, where was a golden image erected to test loyalty through worship?", a: "Plain of Dura" },
      { q: "Which chapter of Daniel is written largely in Aramaic and introduces apocalyptic imagery?", a: "Daniel 7" },
      { q: "Which book portrays cosmic conflict between Michael and Satan?", a: "Revelation" },
      { q: "What period is described as 1,260 days in Revelation?", a: "Tribulation period" },
      { q: "Which figure in Daniel receives dominion from the Ancient of Days?", a: "Son of Man / Jesus" },
      { q: "Which empire is symbolized by a body part of iron in Daniel 2?", a: "Roman Empire" },
    ],
  },
};

const styles = `
  @font-face { font-family:'Obvia'; src:url('./assets/Fontspring-DEMO-obvia_regular.otf'); font-weight:400; }
  @font-face { font-family:'Obvia'; src:url('./assets/Fontspring-DEMO-obvia_semibold.otf'); font-weight:700; }
  @font-face { font-family:'Obvia'; src:url('./assets/Fontspring-DEMO-obvia_bold.otf'); font-weight:800; }
  @font-face { font-family:'Obvia'; src:url('./assets/Fontspring-DEMO-obvia_black.otf'); font-weight:900; }

  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  html { font-size: calc(16px * (100vw / 1920px)); }
  body { font-family:'Obvia',sans-serif; min-height:100vh; width:100vw; overflow-x:hidden; }

  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes popIn  { from{opacity:0} to{opacity:1} }
  @keyframes slideUp{ from{opacity:0} to{opacity:1} }

  /* ── HOME ── */
  .bg-screen {
    width:100vw; min-height:100vh;
    background-size:cover; background-position:center; background-repeat:no-repeat;
    position:relative;
  }
  .bg-screen::before {
    content:''; position:fixed; inset:0;
    background:rgba(70,15,130,0.5); pointer-events:none; z-index:0;
  }
  .home {
    position:relative; z-index:1;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    min-height:100vh; text-align:center; padding:2rem;
    animation:fadeIn 0.5s ease both;
  }
  .home-logo { width:60vw; margin-bottom:1rem; }
  .home-finals {
    font-size:8vw; font-weight:900; color:white;
    letter-spacing:0.05em; margin-bottom:2.5rem; line-height:1;
  }
  .mode-btns { display:flex; gap:2rem; flex-wrap:wrap; justify-content:center; }
  .mode-btn {
    font-family:'Obvia',sans-serif; font-weight:800;
    font-size:1.4rem; letter-spacing:0.12em; text-transform:uppercase;
    padding:1.1rem 3.5rem; border:4px solid white; border-radius:50px;
    cursor:pointer; background:transparent; color:white;
    transition:transform .15s ease, background .2s ease;
  }
  .mode-btn:hover { background:rgba(255,255,255,0.15); transform:scale(1.04); }
  .saved-note {
    margin-top:0.8rem; font-size:0.9rem; font-weight:700;
    color:rgba(255,255,255,0.5); letter-spacing:0.18em; text-transform:uppercase;
  }
  .reset-link {
    position:fixed; bottom:1.4rem; right:1.6rem; z-index:10;
    font-family:'Obvia',sans-serif; font-size:0.75rem; font-weight:700;
    letter-spacing:0.15em; text-transform:uppercase;
    padding:0.5rem 1.2rem; background:transparent;
    border:2px solid rgba(255,255,255,0.22); color:rgba(255,255,255,0.3);
    border-radius:50px; cursor:pointer; transition:all .2s ease;
  }
  .reset-link:hover { border-color:rgba(255,90,90,.6); color:rgba(255,150,150,.85); }

  /* ── CATEGORIES ── */
  .purple-screen {
    width:100vw; min-height:100vh;
    background:#7B2FBE; position:relative;
  }
  .purple-screen::before {
    content:''; position:fixed; inset:0; pointer-events:none;
    background-image:radial-gradient(circle, rgba(255,255,255,0.08) 1.5px, transparent 1.5px);
    background-size:42px 42px;
  }
  .cats-screen {
    position:relative; z-index:1;
    width:100%; min-height:100vh;
    padding:0.5rem 3rem 1rem;
    display:flex; flex-direction:column; justify-content:center;
    animation:fadeIn .4s ease both;
  }
  .cats-title {
    font-size:5vw; font-weight:900; color:white;
    letter-spacing:0.1em; text-align:center; margin-bottom:0.3rem;
  }
  .mode-tag {
    font-size:1rem; font-weight:800; letter-spacing:0.25em;
    text-transform:uppercase; color:rgba(255,255,255,0.6);
    text-align:center; margin-bottom:4rem;
  }
  .cats-grid {
    display:grid; grid-template-columns:repeat(3,1fr);
    gap:4rem 2.5rem; width:95%; margin:0 auto;
  }
  .cat-block {
    display:flex; flex-direction:column; align-items:stretch;
    gap:0.5rem; animation:slideUp .4s ease both;
  }
  .cat-label {
    border:3px solid white; border-radius:16px;
    padding:1rem 1.2rem; text-align:center;
    font-size:1.6vw; font-weight:900;
    color:white; letter-spacing:0.06em; text-transform:uppercase;
  }
  .diff-pill {
    border:none; border-radius:50px; padding:0.85rem 1rem;
    font-family:'Obvia',sans-serif; font-weight:900;
    font-size:1.2vw; letter-spacing:0.1em; text-transform:uppercase;
    color:white; cursor:pointer;
    transition:transform .15s ease, filter .15s ease;
  }
  .diff-pill:hover { transform:scale(1.04); filter:brightness(1.08); }
  .diff-pill.easy   { background:#F9B800; }
  .diff-pill.medium { background:#3D9BE9; }
  .diff-pill.hard   { background:#F03E5F; }
  .diff-pill.used-diff { background:#9e9e9e; cursor:not-allowed; }
  .diff-pill.used-diff:hover { transform:none; filter:none; }
  .cats-home-btn {
    font-family:'Obvia',sans-serif; font-weight:800;
    font-size:1rem; letter-spacing:0.2em; text-transform:uppercase;
    color:white; border:3px solid white; border-radius:50px;
    padding:0.7rem 2.5rem; background:transparent; cursor:pointer;
    transition:background .2s ease; margin:4rem auto 0.1rem; display:block;
  }
  .cats-home-btn:hover { background:rgba(255,255,255,0.15); }

  /* ── BOARD ── */
  .board-screen {
    width:100vw; min-height:100vh;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:2rem; position:relative; z-index:1;
    animation:fadeIn .3s ease both;
  }
  .diff-badge {
    font-family:'Obvia',sans-serif; font-weight:800;
    font-size:1.4vw; letter-spacing:0.22em; text-transform:uppercase;
    color:white; border:3px solid white; border-radius:50px;
    padding:0.6rem 3rem; margin-bottom:1rem;
  }
  .board-title {
    font-size:7vw; font-weight:900; color:white;
    margin-bottom:5rem; text-transform:uppercase;
  }
  .numbers-wrap {
    display:flex;
    flex-wrap:wrap;
    gap:1.5rem;
    width:calc(4 * 12vw + 3 * 1.5rem);
    margin:0 auto 4rem auto;
    justify-content:center;
  }
  .num-btn {
    width:12vw; height:8vw;
    border:none; border-radius:2.5vw; background:white;
    font-family:'Obvia',sans-serif; font-weight:900;
    font-size:3.5vw; color:#1a1a1a; cursor:pointer;
    transition:transform .15s ease;
    display:flex; align-items:center; justify-content:center;
    flex-shrink:0;
  }
  .num-btn:hover:not(.used) { transform:scale(1.08); }
  .num-btn.used { background:#9e9e9e; color:#c5c5c5; cursor:not-allowed; }
  .cats-back-btn {
    font-family:'Obvia',sans-serif; font-weight:800;
    font-size:1.2vw; letter-spacing:0.2em; text-transform:uppercase;
    color:white; border:3px solid white; border-radius:50px;
    padding:0.8rem 3rem; background:transparent; cursor:pointer;
    transition:background .2s ease;
  }
  .cats-back-btn:hover { background:rgba(255,255,255,0.18); }

  /* ── QUESTION + ANSWER ── */
  .q-screen {
    width:100vw; min-height:100vh;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:2rem 4rem; position:relative; z-index:1;
    animation:fadeIn .3s ease both;
  }
  .q-num-pill {
    width:7vw; height:5vw; border-radius:50px; background:white;
    display:flex; align-items:center; justify-content:center;
    font-weight:900; font-size:3vw; color:#1a1a1a;
    margin-bottom:1.5rem; animation:popIn .3s ease both;
  }
  .q-card {
    background:white; border-radius:2rem;
    padding:3rem 5rem; width:90%; max-width:1400px;
    text-align:center; margin-bottom:2rem;
    animation:popIn .35s ease both;
  }
  .q-text { font-size:3vw; font-weight:800; color:#1a1a1a; line-height:1.4; }
  .answer-reveal-btn {
    font-family:'Obvia',sans-serif; font-weight:800;
    font-size:1.4vw; letter-spacing:0.12em; color:white;
    border:3px solid white; border-radius:50px;
    padding:1rem 4rem; background:transparent; cursor:pointer;
    transition:background .2s ease, transform .15s ease;
  }
  .answer-reveal-btn:hover { background:rgba(255,255,255,0.2); transform:scale(1.03); }
  .check-wrap {
    display:flex; flex-direction:column; align-items:center;
    margin-bottom:-2rem; position:relative; z-index:2;
  }
  .check-circle {
    width:4.5vw; height:4.5vw; background:#22c55e; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    animation:popIn .28s ease both;
  }
  .a-card {
    background:white; border-radius:2rem;
    padding:2rem 4rem; width:90%; max-width:1400px;
    text-align:center; margin-bottom:2rem;
    animation:slideUp .35s ease both;
    display:flex; align-items:center; justify-content:center;
    min-height:10vw;
  }
  .a-text { font-size:clamp(1.5rem, 3.5vw, 5rem); font-weight:900; color:#1a1a1a; line-height:1.3; word-break:break-word; }

  /* ── DIALOG ── */
  .overlay {
    position:fixed; inset:0; background:rgba(0,0,0,0.72); z-index:100;
    display:flex; align-items:center; justify-content:center;
  }
  .dialog {
    background:#3d1a6e; border:3px solid rgba(255,255,255,0.28);
    border-radius:24px; padding:2.5rem; max-width:500px; width:90%; text-align:center;
  }
  .dialog h3 { font-size:1.8rem; font-weight:900; color:white; margin-bottom:0.7rem; }
  .dialog p  { color:rgba(255,255,255,0.68); margin-bottom:2rem; line-height:1.55; font-size:1.1rem; }
  .d-btns { display:flex; gap:1rem; justify-content:center; }
  .d-cancel {
    font-family:'Obvia',sans-serif; font-weight:800; font-size:1rem;
    letter-spacing:.1em; padding:0.8rem 2rem;
    background:transparent; border:2px solid rgba(255,255,255,.38);
    color:white; border-radius:50px; cursor:pointer;
  }
  .d-confirm {
    font-family:'Obvia',sans-serif; font-weight:800; font-size:1rem;
    letter-spacing:.1em; padding:0.8rem 2rem;
    background:#F03E5F; border:none; color:white; border-radius:50px; cursor:pointer;
  }
`;

export default function BibleBeeGame() {
  const [screen, setScreen]         = useState("home");
  const [mode, setMode]             = useState(null);
  const [selCat, setSelCat]         = useState(null);
  const [selDiff, setSelDiff]       = useState("Easy");
  const [currentQ, setCurrentQ]     = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [usedHS, setUsedHS]         = useState({});
  const [usedUni, setUsedUni]       = useState({});
  const [showReset, setShowReset]   = useState(false);

  useEffect(() => {
    try {
      const hs  = localStorage.getItem("bb2026-hs");
      const uni = localStorage.getItem("bb2026-uni");
      if (hs)  setUsedHS(JSON.parse(hs));
      if (uni) setUsedUni(JSON.parse(uni));
    } catch (_) {}
  }, []);

  const saveHS  = (u) => { try { localStorage.setItem("bb2026-hs",  JSON.stringify(u)); } catch (_) {} };
  const saveUni = (u) => { try { localStorage.setItem("bb2026-uni", JSON.stringify(u)); } catch (_) {} };

  const usedQ    = mode === "hs" ? usedHS  : usedUni;
  const setUsedQ = mode === "hs"
    ? (u) => { setUsedHS(u);  saveHS(u);  }
    : (u) => { setUsedUni(u); saveUni(u); };

  const CATEGORIES  = mode === "hs" ? HS_CATEGORIES  : UNI_CATEGORIES;
  const QUESTIONS   = mode === "hs" ? HS_QUESTIONS   : UNI_QUESTIONS;
  const Q_COUNT     = mode === "hs" ? HS_Q_COUNT     : UNI_Q_COUNT;
  const CAT_Q_COUNT = mode === "hs" ? HS_CAT_Q_COUNT : UNI_CAT_Q_COUNT;

  const k = (cat, diff, idx) => `${cat}||${diff}||${idx}`;

  const isDiffAllDone = (cat, diff) => {
    const total = CAT_Q_COUNT[cat]?.[diff] ?? Q_COUNT[diff];
    return Array.from({ length: total }, (_, i) => i).every(i => usedQ[k(cat, diff, i)]);
  };

  const boardCount = selCat && selDiff ? (CAT_Q_COUNT[selCat]?.[selDiff] ?? Q_COUNT[selDiff]) : 0;

  const pickQ = (idx) => {
    if (usedQ[k(selCat, selDiff, idx)]) return;
    setCurrentQ({ cat: selCat, diff: selDiff, idx });
    setShowAnswer(false);
    setScreen("question");
  };

  const backToCategories = () => {
    if (currentQ) {
      const u = { ...usedQ, [k(currentQ.cat, currentQ.diff, currentQ.idx)]: true };
      setUsedQ(u);
      setCurrentQ(null);
    }
    setScreen("categories");
  };

  const doReset = () => {
    try { localStorage.removeItem("bb2026-hs"); localStorage.removeItem("bb2026-uni"); } catch (_) {}
    setUsedHS({}); setUsedUni({});
    setShowReset(false); setScreen("home");
  };

  const totalUsed = Object.keys(usedHS).length + Object.keys(usedUni).length;

  return (
    <>
      <style>{styles}</style>
      <div
        className={screen === "home" ? "bg-screen" : screen === "categories" ? "purple-screen" : ""}
        style={
          screen === "home"
            ? { backgroundImage:`url(${bgImage})` }
            : screen !== "categories"
            ? { width:"100vw", minHeight:"100vh", background: DIFF_BG[selDiff] }
            : {}
        }
      >
        {/* RESET DIALOG */}
        {showReset && (
          <div className="overlay">
            <div className="dialog">
              <h3>Reset All Progress?</h3>
              <p>This will clear answered questions for both Universities and High Schools. This cannot be undone.</p>
              <div className="d-btns">
                <button className="d-cancel" onClick={() => setShowReset(false)}>Cancel</button>
                <button className="d-confirm" onClick={doReset}>Yes, Reset</button>
              </div>
            </div>
          </div>
        )}

        {/* HOME */}
        {screen === "home" && (
          <div className="home">
            <img src={logo} alt="Bible Bee 2026 Lusaka Tournament" className="home-logo" />
            <p className="home-finals">FINALS</p>
            <div className="mode-btns">
              <button className="mode-btn" onClick={() => { setMode("uni"); setScreen("categories"); }}>Universities</button>
              <button className="mode-btn" onClick={() => { setMode("hs");  setScreen("categories"); }}>High Schools</button>
            </div>
           <p className="saved-note" style={{position:"fixed", bottom:"1.4rem", left:"50%", transform:"translateX(-50%)", whiteSpace:"nowrap"}}>
  {Object.keys(usedUni).length} UNIVERSITY QUESTION{Object.keys(usedUni).length !== 1 ? "S" : ""} ANSWERED &nbsp;|&nbsp; {Object.keys(usedHS).length} HIGH SCHOOL QUESTION{Object.keys(usedHS).length !== 1 ? "S" : ""} ANSWERED
</p>
            <button className="reset-link" onClick={() => setShowReset(true)}>Reset All</button>
          </div>
        )}

        {/* CATEGORIES */}
        {screen === "categories" && (
          <div className="cats-screen">
            <h1 className="cats-title">CATEGORIES</h1>
            <p className="mode-tag">{mode === "uni" ? "Universities" : "High Schools"}</p>
            <div className="cats-grid">
              {CATEGORIES.map((cat, i) => (
                <div key={cat} className="cat-block" style={{ animationDelay:`${i * 0.06}s` }}>
                  <div className="cat-label">{cat}</div>
                  {DIFFICULTIES.map(d => {
                    const allDone = isDiffAllDone(cat, d);
                    return (
                      <button key={d}
                        className={`diff-pill ${allDone ? "used-diff" : d.toLowerCase()}`}
                        onClick={() => { if (!allDone) { setSelCat(cat); setSelDiff(d); setScreen("board"); } }}>
                        {d}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <button className="cats-home-btn" onClick={() => setScreen("home")}>← Home</button>
          </div>
        )}

        {/* BOARD */}
        {screen === "board" && (
          <div className="board-screen">
            <div className="diff-badge">{selDiff}</div>
            <h2 className="board-title">{selCat}</h2>
            <div className="numbers-wrap">
              {Array.from({ length: boardCount }, (_, i) => {
                const used = !!usedQ[k(selCat, selDiff, i)];
                return (
                  <button key={i} className={`num-btn${used ? " used" : ""}`} onClick={() => pickQ(i)}>
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <button className="cats-back-btn" onClick={() => setScreen("categories")}>Categories</button>
          </div>
        )}

        {/* QUESTION */}
        {screen === "question" && currentQ && (() => {
          const qd = QUESTIONS[currentQ.cat]?.[currentQ.diff]?.[currentQ.idx];
          return (
            <div className="q-screen">
              <div className="q-num-pill">{currentQ.idx + 1}</div>
              <div className="q-card">
                <p className="q-text">{qd?.q || "Question not found."}</p>
              </div>
              {!showAnswer ? (
                <button className="answer-reveal-btn" onClick={() => setShowAnswer(true)}>Answer</button>
              ) : (
                <>
                  <div className="check-wrap">
                    <div className="check-circle">
                      <svg width="50%" height="50%" viewBox="0 0 24 24" fill="none"
                        stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  </div>
                  <div className="a-card">
                    <p className="a-text">{qd?.a || "—"}</p>
                  </div>
                  <button className="cats-back-btn" onClick={backToCategories}>Categories</button>
                </>
              )}
            </div>
          );
        })()}
      </div>
    </>
  );
}
