import { Link } from "@material-ui/core";
import DefinitionList from "../Lists/DefinitionList";

const AlgorithmBookClub = () => <div>
    <h3>What Is This?</h3>
    <p>Algorithm Book Club was an initiative I launched at work to get people talking about algorithms, a traditional weakness for web developers that I knew we were all more than capable of addressing.</p>
    <p>We covered a variety of topics, ending up discussing the neural network variations that were of interest at the time; ultimately working our way towards <Link href="https://en.wikipedia.org/wiki/Generative_adversarial_network">GANs</Link>.</p>
    <p>Along the way we investigated compression algorithms and cryptographic, but mostly we kept our focus on a standard subset of algorithms.</p>
    <p>Each week, we chose an area for investigation (for example, 'greedy algorithms' or 'genetic algorithms'), tried to write some implementation of a relevant algorithm, and had a look into any relevant performance characteristics in time and space.</p>
    <p>Most of the projects we created for this club have since disappeared in various ways, but any of my presentations that I recover in a usable form I have shared on this site.</p>
    <DefinitionList header="Algorithm Bookclub Demos" entries={[
        <span>Diffusion Reaction Algorithm on a Sphere: <Link href="https://drive.google.com/file/d/1Z7faiROIxpw-1PjMh2zV_1SgY_42Dmtc/view?usp=sharing">Mac OS</Link></span>,
        <span>Visualising Maze Generation: <Link href="https://drive.google.com/file/d/1ZbfzBMowHVlbS26DDn30zi1SrbPJs0oF/view?usp=sharing">Mac OS</Link></span>,
    ]}/>
</div>;

export default AlgorithmBookClub;