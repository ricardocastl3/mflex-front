import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroSection() {
  return (
    <div
      style={{
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage:
          "url(https://img.freepik.com/free-photo/happy-smiling-asian-girl-holding-mobile-phone-showing-thumbs-up-recommending-application-smar_1258-91576.jpg?t=st=1744019486~exp=1744023086~hmac=9a6f9b6fd882308bfc80eecceb5bb30778adf62280234853c0bc2731465da0a0&w=1380)",
      }}
      className="flex  md:h-[60vh] h-[50vh] md:pt-36 pt-8 md:pb-28 pb-0 relative justify-center items-center"
    >
      <div className="absolute inset-0 z-0 bg-black/50"></div>
      <div className="z-10 flex absolute flex-col gap-4 md:w-[60vw] w-[90vw] items-center text-center">
        <h4 className="md:text-[2.5rem] md:leading-[2.7rem] leading-8 text-3xl text-white">
          <CTranslateTo eng="Terms Of Use" pt="Termos de Uso" />
        </h4>
        <h4 className="text-md text-slate-200">
          <CTranslateTo
            eng="Last update: 07/04/2025"
            pt="Última atualização: 07/04/2025"
          />
        </h4>
      </div>
    </div>
  );
}
