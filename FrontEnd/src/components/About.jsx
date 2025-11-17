import React from 'react'
import "../css/About.css";
import FounderImg from "../assets/images/cat.JPG";
const About = () => {
  return (
    <div className="containerAboutUs">
        <section className="about">
          <h2>Who We Are</h2>
          <p>
            At <strong>ToDoList</strong>, At ToDoList, we believe productivity shouldn’t need a PhD or a 3-hour tutorial. We’re here to help you stay organized, reduce stress, and actually get things done — not just stack up unfinished tasks (we’ve all been there).
            This page was crafted by Mr. Miyagi, our fearless bug-slayer, who survives caffeine crashes and “why isn’t this working?” moments so you can enjoy a smooth, simple to-do experience. 
          </p>
        </section>

        <section className="missionTodoList">
          <h2>Our Mission</h2>
          <p>We help people manage their time and actually reach their goals — not just write them down and forget they exist. Whether you're planning your day, tracking projects, or herding a team that remembers nothing unless it’s written everywhere, ToDoList fits your workflow.
            And hey, if your tasks are going to stress you out anyway… they might as well be organized.
          </p>
        </section>

        <section className="teamTodoList">
          <h2>Meet the Founder</h2>
          <div className="team-gridTodoList">
            <div className="memberTodoList">
                <img src={FounderImg} alt="Team Member" />
                <h3>Mr. Miyagi (The Slayer of Bugs)</h3>
                <p>Founder & Developer</p>
          </div>
          </div>
          <div className="contactTodoList">
          <a href="mailto:hegdekarthik757@gmail.com" className="btnEmail">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}

export default About
