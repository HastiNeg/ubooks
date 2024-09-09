export default props => {


    if (!props.state.cart) {
        props.state.cart = []
    }


    return <c-c style={{
        width: 250, height: 300, flex: 1, minWidth: 200,
        marginRight: "40px", marginTop: "10px", position: "relative",
        backgroundColor: "#faf4f0", borderRadius: 5,
        boxShadow: "0px 0px 36px -7px rgba(0,0,0,0.75)"
    }}>


        <img
            className={global.styles.hoverzoom_nofade}
            src={props.book.imageLink}
            style={{
                width: "100%", height: 200, flex: 1, objectFit: "fill",
                minWidth: 200, borderTopLeftRadius: 5, borderTopRightRadius: 5
            }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()
            }} />


        <f-cc style={{ padding: "5px 8px", width: "100%" }}>
            <f-12>
                {props.book.title}
            </f-12>
        </f-cc>
        <hr style={{
            width: "80%", opacity: 0.4
        }} />
        <f-csb style={{ width: "100%", padding: "5px 0" }}>
            <c-x style={{ direction: "ltr", margin: "0 15px" }}>
                <f-12 style={{ color: "#8a242e", fontFamily: "serif" }}><del>{props.book.price as number}T</del></f-12>
                <f-15>{props.book.price as number * 0.8}T</f-15>
            </c-x>

            <img src={props.state.cart.includes(props.book.title) ? "https://cdn.turing.team/research/66/check-73-128.png" :
                "https://cdn.turing.team/research/66/cart.png"}
                style={{ height: 30, width: 30, objectFit: "contain", margin: "0 15px" }} />
        </f-csb>





        {/* {props.state.faves.includes(props.book.title) ? <img src="https://cdn.turing.team/research/66/redheart.webp"
            style={{ height: 20, width: 20, objectFit: "contain", position: "absolute", bottom: 6, left: 6 }} /> : null} */}


    </c-c>
}