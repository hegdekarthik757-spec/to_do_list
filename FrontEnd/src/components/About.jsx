import React from 'react'
import "../css/About.css";
import FounderImg from "../assets/images/cat.JPG";
const About = () => {
  return (
    <div className="containerAboutUs">
        <section className="about">
          <h2>Who We Are</h2>
          <p>
            At <strong>ToDoList</strong>, At ToDoList, we believe productivity shouldn’t require a PhD, a 3-hour tutorial, or selling your soul to the calendar gods. Our mission is simple: help you stay organized, reduce stress, and actually get things done — instead of just adding them to a list and never touching them again (we’ve all been there).
            This entire masterpiece of a webpage is built by Cat, our developer, who bravely battles bugs, caffeine crashes, and the occasional “why isn’t this working” meltdown — all so you can enjoy a smooth, beautiful to-do experience.
          </p>
        </section>

        <section className="missionTodoList">
          <h2>Our Mission</h2>
          <p>
            To empower people to manage their time effectively and achieve their goals.
            Whether you’re planning your day, tracking long-term projects, or managing a
            team, ToDoList adapts to your workflow.
          </p>
        </section>

        <section className="teamTodoList">
          <h2>Meet the Founder</h2>
          <div className="team-gridTodoList">
            <div className="memberTodoList">
                <img src={FounderImg} alt="Team Member" />
                <h3>Mr. Miyagi Debugger of Bugs</h3>
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
