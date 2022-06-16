import Books from '../../assets/pictures/Port-Books.png';
import Habt from '../../assets/pictures/Port-Habt.png';
import Link from '../../assets/pictures/Port-Link.png';
import PVOC from '../../assets/pictures/Port-PVOC.png';
import Softlete from '../../assets/pictures/Port-Softlete.png';

export type PortfolioItemTypes = {
    img: any
    description: string
    github: string
    website: string
    name: string
}

const ITEMS = [
    {
        img: Softlete,
        name: "Softlete",
        description: "Softlete is a tool/service to help athletes manage their workouts and to enhance their training. There is a social networking aspect to it as well. This app is my favorite and spent months of hard working creating it.",
        github: 'https://github.com/nguyening20/softlete_public',
        website: 'https://www.softlete.com/',
    },
    {
        img: Habt,
        name: "Habts",
        description: "Habts is a habit tracker app to help people implement and/or remove habits. Some key features are daily notifications, interactive rewards, and note tool. It interacts with Apple's IAP API to handle payments.",
        github: 'https://github.com/nguyening20/Habts',
        website: 'https://habt-b0f23.web.app/',
    },
    {
        img: Books,
        name: "Books & Brewskies",
        description: "A ecommerce website created with React. The website interacts with Stripe's API to handle payments. A fully customized blog that is interactive.",
        github: 'https://github.com/nguyening20/booksandbrewskies',
        website: ""
    },
    {
        img: Link,
        name: "LetsLink",
        description: "Letslink is a social media app. It shows you users within a 1 mile radius. Developed during covid. I thought it would be a cool way to meet people out in public while social distancing.",
        github: 'https://github.com/nguyening20/BreakTheIce',
        website: ''
    },
    {
        img: PVOC,
        name: "Peoples Voice On Climate",
        description: "PVOC is a nonprofit organization that promotes climate assemblies. It's a basic website created with Squarespace where I added customized designs.",
        github: '',
        website: 'https://www.peoplesvoiceonclimate.org/'
    },
]

export default ITEMS