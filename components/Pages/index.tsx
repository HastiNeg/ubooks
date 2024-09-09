import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import WindowFloat from '../Libs/WindowFloat';
import Block from './Block';



export default p => Component(p, Page);
const Page: PageEl = (props, state:
  {
    form: string
    book: {
      title: string, author: string,
      country: string, imageLink: string,
      price: number, pages: number, language: string
    }
    cart: Array<string>
  }, refresh, getProps) => {

  let styles = global.styles

  let total_price = 0

  if (!state.cart) {
    state.cart = []
  }


  for (let title of state.cart) {
    let book = props.books.find(b => b.title == title)
    if (book) {
      total_price += (book.price * 0.8)
    }
  }

  return (
    <div style={{ direction: "ltr", minHeight: "11vh", }}>
      <br-x />

      {state.form == "bookspecs" ? <WindowFloat
        title="Product Specs" style={{ fontFamily: "Georgia" }} onclose={() => {
          delete state.form
          refresh()
        }}>

        <f-c>
          <f-15>Book name:</f-15>
          <sp-2 />
          <f-15>{state.book.title}</f-15>
        </f-c>

        <f-c>
          <f-15>Author:</f-15>
          <sp-2 />
          <f-15>{state.book.author}</f-15>
        </f-c>


        <f-c>
          <f-15>Country:</f-15>
          <sp-2 />
          <f-15>{state.book.country}</f-15>
        </f-c>

        <f-c>
          <f-15>Language:</f-15>
          <sp-2 />
          <f-15>{state.book.language}</f-15>
        </f-c>



        <f-c>
          <f-15>Pages:</f-15>
          <sp-2 />
          <f-15>{state.book.pages as number}</f-15>
        </f-c>

        <g-b style={{
          backgroundColor:
            state.cart.includes(state.book.title) ? "#993a47" :
              "#c99e7b", borderRadius: 10
        }}
          onClick={() => {
            if (state.cart.includes(state.book.title)) {
              state.cart = state.cart.filter(bookname => state.book.title != bookname)
              state.form = null
              refresh()
            }
            else {
              state.cart.push(state.book.title)
              state.form = null
              refresh()
            }
          }}>
          {state.cart.includes(state.book.title) ? <f-13>Remove from bag</f-13> : <f-13>Add to bag</f-13>}
        </g-b>



      </WindowFloat> : null}


      <Window title={"Items"} style={{ margin: 10, width: "calc(100% - 20px)" }}>
        <f-cse style={{ fontFamily: "Georgia", width: "100%", height: 60 }}>
          <f-14>Total price: {total_price}</f-14>
          <f-14>Number of items: {state.cart.length}</f-14>
        </f-cse>
      </Window>
      <Window title={"Welcome"}
        style={{
          fontFamily: "Georgia",
          minHeight: 200, margin: 10, width: "calc(100% - 20px)",
          // backgroundImage: 'url("https://cdn.turing.team/research/66/blueaura.jpg")',
          // backgroundRepeat:"no-repeat",
          backgroundColor: "#9e7a5c",
          backgroundSize: "cover",

        }}>
        {/* <pre style={{ direction: "ltr" }}>{JSON.stringify(props, null, 2)}</pre> */}


        <w-cse style={{ gap: 5, padding: 5 }}>
          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh}
            />
          })}
        </w-cse>
      </Window >
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;


  let books = await global.db.collection("books").find({}).toArray()


  for (let book of books) {
    book.imageLink = "https://cdn.turing.team/research/ex/books/" + book.imageLink
  }


  console.log(books)




  return {
    props: {
      data: global.QSON.stringify({
        session,
        books
        // nlangs,
      })
    },
  }
}