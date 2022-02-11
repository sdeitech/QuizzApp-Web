import React, { Component } from "react";
import { TheFooter, TheFooterInner, TheHeader } from "../../containers/index";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { showLoader: false };
    }

    render() {
        return (
            <>
                <TheHeader />
                <main id="main">
                    <section id="hero" class="d-flex align-items-center">
                        <div class="hero-img">
                            <img
                                src="./murabbo/img/bg.png"
                                class="img-fluid animated"
                                alt="Background"
                            />
                        </div>
                    </section>
                </main>
                <TheFooterInner />
            </>
        );
    }
}

export default Home;
