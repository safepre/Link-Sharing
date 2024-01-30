import githubIcon from '../assets/images/icon-github.svg';
import arrow from '../assets/images/arrow.svg';

const Preview = () => {
  return (
    <section className='flex flex-col gap-20 relative md:after:content-[""] md:after:absolute md:after:h-2/5 md:after:w-full md:after:bg-accent z-20 md:after:-z-10 bg-[#FAFAFA] md:after:rounded-b-[2rem] min-h-screen'>
      <div className='flex items-center justify-between gap-2 px-5 md:bg-white m-5 md:py-2 md:rounded-xl lg:py-3'>
        <button className='w-full bg-white text-accent border border-accent px-6 py-2 rounded-lg h-14 md:w-fit'>
          Back to Editor
        </button>
        <button className='bg-accent text-white w-full capitalize px-6 py-2 rounded-lg h-14 md:w-fit'>
          share link
        </button>
      </div>
      {/* user content */}
      <div className='flex flex-col items-center justify-center py-3 w-5/6 mx-auto gap-16 bg-white -mt-10 md:shadow-ml md:rounded-lg md:p-12 md:w-2/4 lg:w-1/4 md:mt-[5rem] min-h-[20rem]'>
        <div className='flex flex-col gap-2 items-center'>
          {/* user's image */}
          <div
            id='user-avatar'
            className='w-24 h-24 border-4 border-accent rounded-[6.5rem]'
          ></div>
          {/* user's name */}
          <h2 className='capitalize text-dark-gray font-bold text-[2rem]'></h2>
          {/* user's email */}
          <p className='text-dark-grey'></p>
        </div>

        {/* social links */}
        <div className='flex flex-col gap-3 w-full'>
          <a
            href=''
            className='bg-[#1A1A1A] text-white items-center flex gap-2 w-full p-4 rounded-lg'
          >
            <img src={githubIcon} alt='github icon' className='' />
            <span className='capitalize'>github</span>
            <img src={arrow} alt='forward arrow' className='ml-auto' />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Preview;
