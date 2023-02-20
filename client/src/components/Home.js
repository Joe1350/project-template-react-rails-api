import React, { useContext } from "react";
import { UserContext } from "../context/user";

function Home() {
    let homePageImages = [
        "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/2046753/pexels-photo-2046753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ]

    let { student } = useContext(UserContext)

    function getRandomImage(array) {
        let randomNumber = Math.floor(Math.random() * array.length);
        return homePageImages[randomNumber]
    }

    return (
        <div style={{ padding: "5%" }}>
            {student ? <h1>Hello, {student.name}</h1> : <h1>Learning Plus</h1>}
            <img
                style={{ width: "300px" }}
                src={getRandomImage(homePageImages)}
                alt="random activity"
            />
            <p>Welcome to Learning Plus. We offer one day, intense classes to expand your horizons. Students may enroll in one class per day and up to five classes per week. Class sign up opens on Saturday for the following week. Each class is interactive with hands on learning. Try something new and meet new people. Most curriculums introduce you to the basic concepts and provide opportunity to practice the new skills. Join us! </p>
        </div>
    )
}

export default Home;
