import React from 'react';
import Layout from "../components/layouts/Layout";
import ReactFullpage from "@fullpage/react-fullpage";
import MySection from "../pages/MySection"

const anchors = ["firstPage", "secondPage", "thirdPage"];

class Index extends React.Component {
    render() {
        return (
            <Layout>
                <div className="relative">
                    <ReactFullpage
                        anchors={anchors}
                        navigation
                        navigationTooltips={anchors}
                        sectionsColor={["#282c34", "#ff5f45", "#0798ec"]}
                        onLeave={(origin, destination, direction) => {
                            console.log("onLeave event", {origin, destination, direction});
                        }}
                        render={({state, fullpageApi}) => {
                            console.log("render prop change", state, fullpageApi); // eslint-disable-line no-console

                            return (
                                <div>
                                    <MySection content={"Slide down!"}/>
                                    <MySection content={"Keep going!"}/>
                                    <MySection content={"Slide up!"}/>
                                </div>
                            );
                        }}
                    />
                </div>
            </Layout>
        );
    }
}


export default Index;
