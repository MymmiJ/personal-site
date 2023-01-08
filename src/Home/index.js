import { Box, Container, Card, Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import DefinitionList from '../Lists/DefinitionList';
import ReactionDiffusion from './Images/reaction-diffusion.png';
import MazeVersions from './Images/maze-versions.png';
import DungeonGenerator from './Images/dungeon-exploration.png';
import Antethesizer from './Images/antethesizer.png';

const Home = () => {
    return <Container>
        <DefinitionList header="Work" entries={[
          <DefinitionList header="Overview" entries={[
            <Typography>For a more detailed look at my employment history, please see my <Link href="https://www.linkedin.com/in/james-macgregor-41a74340/">LinkedIn profile</Link>.</Typography>
          ]} />,
          <DefinitionList header="Ably" entries={[
            <Typography>Used Gatsby to develop a <Link href="https://ably.com/docs">static site</Link> that interprets a custom format built on <Link href="https://textile-lang.com/">Textile</Link> into a dynamic code documentation site.</Typography>,
            <Typography>The <Link href="https://github.com/ably/docs">repository is open-source</Link> and accepting contributions or issues.</Typography>
          ]}/>,
          <DefinitionList header="Future" entries={[
            <Typography>Worked on a CMS with a headless React front-end with a mixture of CalmmJS and RxJS for state management.</Typography>,
            <Typography>Also worked extensively on the backend technology stack consisting of PHP, Solr, Riak+Yokozuna Solr, ArangoDB Redis, MySQL, and Active Directory.</Typography>
          ]}/>
        ]}/>
        <DefinitionList header="Novelties" entries={[
            <Typography><Link href="https://antethesizer.jimmymacgregor.com/">Antethesizer</Link> [<Link href="https://github.com/MymmiJ/antethesizer">GitHub</Link>]</Typography>,
            <Box display="inline-block">
              <Card maxWidth="480px" width="480px">
                <figure>
                  <img width="400px" height="200px" src={Antethesizer} alt="A screenshot showing various music generating functionalities"/>
                  <figcaption>Features of 'Antethesizer', a music-generating app</figcaption>
                </figure>
              </Card>
            </Box>,
            "Dungeon Generator [In development]",
            <Box display="inline-block">
              <Card maxWidth="480px" width="480px">
                <figure>
                  <img src={DungeonGenerator} alt="An opening screenshot of the AD&amp;D dungeon generator"/>
                  <figcaption>An opening screenshot of the AD&amp;D dungeon generator</figcaption>
                </figure>
              </Card>
            </Box>,
            <DefinitionList header="Algorithm Bookclub Demos" entries={[
              <span>Diffusion Reaction Algorithm on a Sphere: <Link href="https://drive.google.com/file/d/1Z7faiROIxpw-1PjMh2zV_1SgY_42Dmtc/view?usp=sharing">Mac OS</Link></span>,
              <Box display="inline-block">
                <Card maxWidth="480px" width="480px">
                  <figure>
                    <img src={ReactionDiffusion} alt="Demonstration of reaction-diffusion on a sphere"/>
                    <figcaption>Reaction-Diffusion algorithm results</figcaption>
                  </figure>
                </Card>
              </Box>,
              <span>Visualising Maze Generation: <Link href="https://drive.google.com/file/d/1ZbfzBMowHVlbS26DDn30zi1SrbPJs0oF/view?usp=sharing">Mac OS</Link></span>,
              <Box display="inline-block">
                <Card maxWidth="480px" width="480px">
                  <figure>
                    <img src={MazeVersions} alt="Visualisations of different maze generation algorithms"/>
                    <figcaption>Various maze generation algorithms, visualised</figcaption>
                  </figure>
                </Card>
              </Box>,
              <Link href="/ABC">Algorithm Book Club</Link>
            ]}/>
        ]}/>
        <DefinitionList header="Game Jam Entries" entries={[
          <Link href="https://mymmij.itch.io/mycorhizal">Mycorhizhal</Link>,
          <Link href="https://mymmij.itch.io/oddbal">Oddbal</Link>
        ]}/>
        <DefinitionList header="Niche Tools" entries={[
          <Link href="https://github.com/MymmiJ/arango-rbac-php">PHP5 ArangoDB RBAC library</Link>
        ]}/>
        <DefinitionList header="Older Projects (Pre-2014)" entries={[
          <Link href="/Old/FourButton">Four-button writing in English</Link>,
          "Unfinished pixel-art navigation [To Be Added]",
          <Link href="/Old/Clawrite">Simple 'Clawrite' Example</Link>,
          <Link href="https://www.kongregate.com/games/Jaywalker2/hard-beans">Flash Game 'Hard Beans'</Link>
        ]}/>
        <DefinitionList header="Languages Used Professionally/Extensively" entries={[
          "JavaScript",
          "TypeScript",
          "C#",
          "PHP",
          "Python",
          "Racket",
          "Go",
          "AQL - Arango Query Language",
          "SQL"
        ]}/>
        <DefinitionList header="Frameworks Used Professionally/Extensively" entries={[
          "React",
          "Gatsby",
          "Sklearn",
          "Symfony",
          "Tensorflow",
          "Calmm",
        ]}/>
        <DefinitionList header="Technologies I Love" entries={[
          <Link href="https://github.com/dubzzz/fast-check">Property Testing</Link>,
          <Link href="https://github.com/bitnami-labs/sealed-secrets">Sealed Secrets</Link>,
          <Link href="https://unity.com/">Unity</Link>,
          <Link href="https://www.blender.org/">Blender</Link>,
          <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html">Random Forests</Link>,
          <Link href="https://www.tensorflow.org/tutorials/images/transfer_learning">Transfer Learning</Link>,
          <Link href="https://www.haskell.org/tutorial/patterns.html">Pattern Matching</Link>
        ]}/>
        <DefinitionList header="Causes I Support" entries={[
          <Link href="https://www.bristollawcentre.org.uk/help-us/donate/">Bristol Law Centre</Link>,
          <Link href="https://mermaidsuk.org.uk/donate/">Mermaids UK</Link>,
          <Link href="https://www.msf.org/">Médecins Sans Frontières</Link>,
          <Link href="https://www.amnesty.org.uk/">Amnesty International</Link>,
          <Link href="https://www.givewell.org/charities/sci-foundation">Schistosomiasis Foundation</Link>,
          <Link href="https://lichess.org/patron">Lichess</Link>
        ]}/>
    </Container>
};

export default Home;
