import { BarChart3, Edit, Save, Download } from "lucide-react";
import Card from "./cards";

export default function FeatureSection(){
    return(
        <>
       {features.map((feature) => 
            <Card
            key={feature.id}
            Icon = {feature.icon}
            title = {feature.title}
            color = {feature.color}
            description ={feature.description}
            />
        )}
        </>
    )
}


const features = [{
    id:1,
    icon: Edit,
    title : "Daily Log Management",
    description: "Effortlessly record your daily activities, tasks, and learning outcomes with our intuitive interface.",
    color: "blue"
},
{
    id:2,
    icon: BarChart3,
    title : "Weekly Summary",
    description: "Automatically group and visualize your logs by weeks for better progress tracking",
    color: "green"
},
{
    id:3,
    icon: Save,
    title : "Auto Save",
    description: "Never lose your work with intelligent auto-save using secure local storage",
    color: "purple"
},
{
    id:4,
    icon: Download,
    title : "Export to PDF",
    description: "Generate professional, formatted PDF reports ready for institutional submission",
    color: "orange"
},
]

const colorMap = {
    blue: { bg: "bg-blue-100", text: "text-blue-600" },
    green: { bg: "bg-green-100", text: "text-green-600" },
    purple: { bg: "bg-purple-100", text: "text-purple-600" },
    orange: { bg: "bg-orange-100", text: "text-orange-600" },
    teal: { bg: "bg-teal-700", text: "text-teal-700" }
};