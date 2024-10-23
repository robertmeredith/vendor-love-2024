import { Link } from 'react-router-dom'

const Feature = () => {
  return (
    <div>
      {/* Box 1 */}
      <div className="md:grid grid-cols-3 bg-slate-50 xl:px-24 items-center">
        <div className="flex flex-col p-12 gap-6 flex-2 col-span-2">
          <h3 className="text-xl font-semibold text-violet-600 ">
            Share The Love
          </h3>
          <h2 className="text-3xl font-semibold text-slate-700">
            Make easy connections with others in the wedding industry
          </h2>
          <p className="font-medium text-slate-500">
            Deliver stunning images to your vendors fast and easy with our app.
            They will love seeing their work and share your work with new
            clients. Collect vendor information in a snap and tag them on social
            media with one click. No hassle, no delay, just more exposure and
            more bookings.
          </p>
          <Link to={'/register'}>
            <button className=" text-sm bg-indigo-500 px-3 py-1 text-white rounded-3xl hover:bg-slate-700 mt-8 lg:mt-0 justify-around items-center">
              Get Started
            </button>
          </Link>
        </div>
        <img
          src="img/Appreciation-rafiki.png"
          alt=""
          className="my-auto mx-auto"
        />
      </div>
      {/* Box 2 */}
      <div className="flex flex-col-reverse py-12 items-center md:grid md:grid-cols-2 lg:grid-cols-3 xl:px-24 gap-14">
        <img
          src="img/filter-dropdown.jpg"
          alt=""
          className="w-8/12 mx-auto lg:w-auto hover:-translate-x-1 transition-all"
        />
        <div className="flex flex-col gap-4 items-center px-6 text-center md:items-start md:text-left lg:col-span-2">
          <h3 className="text-xl font-semibold text-violet-600 ">
            Easy for clients
          </h3>
          <h4 className="text-3xl font-semibold text-slate-700">
            Quickly search vendors
          </h4>
          <p className="font-medium text-slate-500">
            As the client types in the form, a dropdown box provides a filtered
            list of vendors already in your database. One click and the
            remainder of the details are completed.
          </p>
          <p className="font-medium text-slate-500">
            Intelligent auto parsing of instagram handles and web addresses
            means that consistent, clean data is saved to your database.
          </p>
        </div>
      </div>
      {/* Box 3 */}
      <div className="border border-top-2 w-10/12 bg mx-auto"></div>
      <div className="flex flex-col py-12 items-center md:grid lg:grid-cols-2 xl:px-24 gap-14">
        <div className="flex flex-col gap-4 items-center px-6 text-center lg:items-start lg:text-left lg:col-span-1">
          <h3 className="text-xl font-semibold text-violet-600 ">
            Easy for you
          </h3>
          <h4 className="text-3xl font-semibold text-slate-700">
            View details all in one place
          </h4>
          <p className="font-medium text-slate-500">
            Filter through client submissions by name, then view all the details
            of the event on one page.
          </p>
          <ul className="p-4 list-disc flex flex-col gap-4 text-left text-">
            <li className="">
              Clicking an instagram handle, web or email address copies it to
              your clipboard. Perfect for those times when you only need the
              details of a single vendor.
            </li>
            <li className="">
              'Copy for Instagram' copies all the event vendors Instagram
              handles to your clipboard in a format ready for pasting straight
              in to an instagram comment. No fussing around with formatting.
            </li>
            <li className="">
              Copy only the username e.g{' '}
              <span className=" text-indigo-600">'@theflowershop</span> or
              'Include vendor type' to have the type of service included e.g.{' '}
              <span className=" text-indigo-600">
                'Florist - @theflowershop'
              </span>
            </li>
            <li className="">
              'Copy for Email' copies a string of all the comma separate vendor
              emails, ready to paste in to your email or image gallery provider
              of choice.
            </li>
          </ul>
        </div>
        <img
          src="img/single-client-submission.jpg"
          alt=""
          className="w-8/12 mx-auto lg:w-auto border-2 rounded-xl shadow-lg hover:-translate-y-1 transition-all"
        />
      </div>
    </div>
  )
}

export default Feature
