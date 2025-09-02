export default function Card({title, description, Icon, color,}){
    const colors = colorMap[color] || { bg: "bg-gray-100", text: "text-gray-600" };
    return(
        <div
        className=" border-0 shadow-lg rounded-2xl text-center p-6 group bg-gradient-to-br from-white to-gray-100  hover:to-white transform hover:-translate-y-2"
        >
        <div className="flex justify-center">
        <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <Icon  className= {colors.text}/>
        </div> 

        </div>    
                  <h2
          className="text-xl font-semibold mb-3 text-gray-900"
          >{title}</h2>
          <p
          className="text-gray-600"
          >{description}</p> 
        </div>
    )
}

const colorMap = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
    teal: { bg: "bg-teal-700", text: "text-teal-700" }
};