import { useState } from "react";
import Head from "next/head";
import { useTransition, useSprings, animated } from "react-spring";

export default function Home() {
    const [show, setShow] = useState(false);

    const formItems = [
        {
            type: "input",
            label: "name",
            placeHolder: "Mohammad",
        },
        {
            type: "input",
            label: "email",
            placeHolder: "mosa***@gmail.com",
        },
        {
            type: "input",
            label: "password",
            placeHolder: "********",
        },
        {
            type: "button",
            text: "hide",
        },
    ];

    const transition = useTransition(show, {
        from: { bottom: "-100%" },
        enter: { bottom: "0%" },
        leave: { bottom: "-100%" },
        delay: !show ? 400 : 0,
    });

    const formTransition = useSprings(
        formItems.length,
        formItems.map((item, index) => ({
            from: { y: 50, opacity: 0 },
            to: { y: 0, opacity: 1 },
            delay: !show ? (formItems.length - index) * 50 : index * 100 + 50,
            reverse: !show,
        })),
    );

    return (
        <div>
            <Head>
                <title>React-Spring PlayGround</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={mainStyle}>
                <button onClick={() => setShow(true)} style={buttonStyle}>
                    show
                </button>
            </main>

            {transition((style, item) =>
                !item ? null : (
                    <animated.div style={{ ...modalStyle, ...style }}>
                        {formTransition.map((styles, index) => {
                            switch (formItems[index].type) {
                                case "input":
                                    return (
                                        <animated.input
                                            key={index}
                                            placeholder={
                                                formItems[index].placeHolder
                                            }
                                            style={{
                                                ...inputStyle,
                                                ...styles,
                                            }}
                                        />
                                    );
                                default:
                                    return (
                                        <div style={buttonBoxStyle}>
                                            <animated.button
                                                key={index}
                                                onClick={() => setShow(false)}
                                                placeholder={
                                                    formItems[index].placeHolder
                                                }
                                                style={{
                                                    ...buttonStyle,
                                                    ...styles,
                                                }}
                                            >
                                                {formItems[index].text}
                                            </animated.button>
                                        </div>
                                    );
                            }
                        })}
                    </animated.div>
                ),
            )}
            {/* <div style={modalStyle}>salam</div> */}
        </div>
    );
}

const mainStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const buttonStyle = {
    border: "none",
    borderRadius: "5px",
    background: "#000",
    color: "#fff",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
};

const buttonBoxStyle = {
    width: "20vw",
    maxWidth: "400px",
    minWidth: "200px",
    display: "flex",
    justifyContent: "flex-end",
};

const inputStyle = {
    marginBottom: "10px",
    padding: "10px",
    width: "20vw",
    maxWidth: "400px",
    minWidth: "200px",
    border: "1px solid #E0E0E0",
    borderRadius: "5px",
};

const modalStyle = {
    width: "100vw",
    height: "100vh",
    position: "fixed",
    color: "#fff",
    background: "#FAFAFA",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
};
