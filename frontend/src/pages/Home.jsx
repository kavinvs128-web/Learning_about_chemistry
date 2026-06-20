import {
  Bell,
  ChevronDown,
  BookOpen,
  Zap,
  Calendar,
  Trophy,
  ArrowRight,
  Moon,
  CircleHelp,
  LogOut
} from "lucide-react";

import {useState,useEffect} from "react";

import WordsOfWisdom from "../components/WordsOfWisdom";

import "../styles/home.css";


function Home(){


const [profileOpen,setProfileOpen] = useState(false);

const [notificationOpen,setNotificationOpen] = useState(false);

const [darkMode,setDarkMode] = useState(true);



const [user,setUser] = useState({

name:"Student",

email:"student@email.com",

role:"Student"

});





useEffect(()=>{


const savedUser = localStorage.getItem("user");


if (!savedUser) return;


  const userData = JSON.parse(savedUser);


  setTimeout(() => {

    setUser(userData);

  },0);

},[]);





return(


<div className={darkMode ? "home-page" : "home-page light"}>



{/* NAVBAR */}

<nav className="navbar">



<div className="brand">


<div className="logo">
C
</div>


<div>

<h1>
ChemIQ
</h1>


<p>
Learn • Explore • Discover
</p>


</div>


</div>







<div className="nav-actions">





{/* NOTIFICATION */}


<div className="notification-wrapper">


<button

className="notification"

onClick={()=>{

setNotificationOpen(!notificationOpen);

setProfileOpen(false);

}}

>


<Bell/>


</button>






{notificationOpen && (

<div className="notification-panel">



<div className="notification-header">

<h3>
Notifications
</h3>


<span>
Mark all read
</span>


</div>





<div className="notification-empty">



<div className="empty-icon">

🔔

</div>




<h3>
No Notifications
</h3>



<p>

You're all caught up!
<br/>
New updates will appear here.

</p>



</div>





</div>

)}



</div>







{/* PROFILE */}



<div className="profile-wrapper">



<button

className="student"

onClick={()=>{

setProfileOpen(!profileOpen);

setNotificationOpen(false);

}}

>



<div className="avatar">


{user.name.charAt(0).toUpperCase()}


</div>



<div>


<h3>
{user.name}
</h3>


<span>
{user.role}
</span>


</div>



<ChevronDown size={18}/>


</button>







{profileOpen && (



<div className="profile-box">



<div className="profile-top">



<div className="large-avatar">


{user.name.charAt(0).toUpperCase()}


<span className="online-dot"></span>


</div>



<h2>

{user.name}

</h2>



<h4>

{user.role.toUpperCase()}

</h4>



<p>

{user.email}

</p>



</div>





<div className="divider"></div>






<div className="profile-option">



<div className="option-left">


<div className="option-icon">

<Moon size={18}/>

</div>


<span>
Dark Mode
</span>


</div>




<div

className={darkMode?"toggle active":"toggle"}

onClick={()=>setDarkMode(!darkMode)}

>


<div></div>


</div>



</div>







<div className="profile-option">


<div className="option-left">


<div className="option-icon cyan">

<CircleHelp/>

</div>



<span>
Help & Contact
</span>


</div>



</div>







<div className="divider"></div>




<button className="logout-btn">


<LogOut size={18}/>


Log Out


</button>



</div>


)}





</div>






</div>



</nav>









{/* BODY */}


<section className="dashboard">



<div className="welcome">


<div className="emoji">
👋
</div>



<h2>

Hi,

<span>
{user.name}
</span>


</h2>




<p>

Ready to explore chemistry today?

</p>



</div>





<WordsOfWisdom />





</section>









<section className="features">



<Card

icon={<BookOpen/>}

title="Live Books"

text="Explore interactive chemistry books with animations & live examples."

badge="40 Books"

color="blue"

/>





<Card

icon={<Zap/>}

title="Surprise Test"

text="Get randomly generated quizzes to challenge your chemistry knowledge."

badge="Try Now"

color="yellow"

/>





<Card

icon={<Calendar/>}

title="Calendar"

text="Track your lessons, deadlines, and upcoming chemistry events."

badge="3 Events"

color="purple"

/>





<Card

icon={<Trophy/>}

title="Attempts Corner"

text="Review your past test attempts, scores, and performance trends."

badge="12 Attempts"

color="green"

/>



</section>





</div>


)

}








function Card({icon,title,text,badge,color}){


return(


<div className={`feature-card ${color}`}>


<div className="feature-icon">

{icon}

</div>



<h2>

{title}

</h2>



<p>

{text}

</p>




<div className="card-footer">


<span>
{badge}
</span>



<button>

<ArrowRight/>

</button>



</div>



</div>


)


}



export default Home;