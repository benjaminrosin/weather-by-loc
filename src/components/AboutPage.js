function AboutPage (){
    return (
        <div className="container mt-4">
            <h1 className="mb-3">About</h1>
            <p>
                This project is a dynamic weather forecast application built with <strong>React</strong>.
                It allows users to manage a list of cities, mark favorite ones, and retrieve a 7-day
                weather forecast for each city using the external <a href="http://www.7timer.info" target="_blank"
                                                                     rel="noopener noreferrer">7Timer API</a>.
                The app features intuitive navigation with <strong>React Router</strong>, form validation,
                filtering, and responsive design using <strong>Bootstrap</strong>.
            </p>

            <h2>Main Features:</h2>
            <ul>
                <li>Add, edit, and delete cities with real-time validation.</li>
                <li>Mark cities as favorites and view them sorted alphabetically.</li>
                <li>Filter favorite cities by country.</li>
                <li>View detailed 7-day weather forecasts.</li>
                <li>Responsive and user-friendly interface.</li>
            </ul>

            <h2>Developed by:</h2>
            <p>
                <strong>Yochai Benita</strong> Yochaiben@edu.jmc.ac.il <br/>
                <strong>Benjamin Rosin</strong> Benjaminro@edu.jmc.ac.il
            </p>
        </div>
    )
}

export default AboutPage;