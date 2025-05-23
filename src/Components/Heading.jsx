const Heading = ({ text1, text2 }) => {
    return (
      <div className="inline-flex gap-2 items-center mb-3">
        <p className="text-gray-500">{text1}</p>
        <span className="text-gray-700 font-semibold">{text2}</span>
        <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700 mt-2"></p> 
      </div>
    );
  };
  
  export default Heading;
  