import CTranslateTo from "@/@components/(translation)/CTranslateTo";

export default function HeroServices() {
  return (
    <div className="md:h-[55vh] h-[35vh] flex-col  flex md:items-start items-center md:text-start text-center justify-center md:px-14 px-4">
      <h1 className="md:text-[2rem] text-2xl font-bold dark:text-yellow-400 text-yellow-500">
        <CTranslateTo eng="Services" pt="Serviços" />
      </h1>
      <h4 className="dark:text-white md:mt-2 t-2 text-lg">
        <CTranslateTo
          eng="Our best marketing and advertising services for you 🚀"
          pt="Os nossos melhores serviços de marketing e publicidade para si 🚀"
        />
      </h4>
    </div>
  );
}
