import { Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import DefinitionList from '../Lists/DefinitionList';

const Home = () => {
    return <Container>
        <DefinitionList header="Novelties" entries={[
            <Link href="https://github.com/MymmiJ/antethesizer">Antethesizer</Link>,
            "Dungeon Generator [To Be Added]",
            <DefinitionList header="Algorithm Bookclub Demos" entries={[
              <span>Diffusion Reaction Algorithm on a Sphere: <Link href="https://drive.google.com/file/d/1Z7faiROIxpw-1PjMh2zV_1SgY_42Dmtc/view?usp=sharing">Mac OS</Link></span>,
              <span>Visualising Maze Generation: <Link href="https://drive.google.com/file/d/1ZbfzBMowHVlbS26DDn30zi1SrbPJs0oF/view?usp=sharing">Mac OS</Link></span>,
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
          "Sklearn",
          "Symfony",
          "Tensorflow",
          "Calmm",
        ]}/>
        <DefinitionList header="Technologies I Love" entries={[
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