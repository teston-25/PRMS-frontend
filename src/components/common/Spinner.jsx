function Spinner() {
  return (
    <div className="h-full flex items-center justify-center">
      <div
        className="w-24 h-24 rounded-full bg-[conic-gradient(#0000_10%,#d1d5db)] 
        [mask:radial-gradient(farthest-side,#0000_calc(100%-8px),#000_0)] 
        animate-[rotate_1.5s_linear_infinite]"
      ></div>
    </div>
  );
}

export default Spinner;
