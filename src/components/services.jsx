"use client"

import { useState } from "react"
import { Gift, Book, MessageSquare, Contact2, Flame, Music, BarChart2, Star, Hand } from "lucide-react"

export default function ServiceGrid() {
    const [hoveredIndex, setHoveredIndex] = useState(null)

    const services = [
        {
            icon: <Music className="icon" />,
            title: "Audiomack",
            description: "Add an Audiomack player to your Linktree",
            color: "#FF9900"
        },
        {
            icon: <BarChart2 className="icon" />,
            title: "Bandsintown",
            description: "Drive ticket sales by listing your events",
            color: "#00B4D8"
        },
        {
            icon: <Flame className="icon" />,
            title: "Bonfire",
            description: "Display and sell your custom merch",
            color: "#FF6B6B"
        },
        {
            icon: <Book className="icon" />,
            title: "Books",
            description: "Promote books on your Linktree",
            color: "#94A3B8"
        },
        {
            icon: <Gift className="icon" />,
            title: "Buy Me A Gift",
            description: "Let visitors support you with a small gift",
            color: "#DC2626"
        },
        {
            icon: <Star className="icon" />,
            title: "Cameo",
            description: "Make impossible fan connections possible",
            color: "#8B5CF6"
        },
        {
            icon: <Hand className="icon" />,
            title: "Clubhouse",
            description: "Let your community in on the conversation",
            color: "#FBBF24"
        },
        {
            icon: <MessageSquare className="icon" />,
            title: "Community",
            description: "Build an SMS subscriber list",
            color: "#3B82F6"
        },
        {
            icon: <Contact2 className="icon" />,
            title: "Contact Details",
            description: "Easily share downloadable contact details",
            color: "#9333EA"
        }
    ]

    return (
        <div className="container">
            <h2 className="title">All Links and Integrations</h2>
            <div className="service-grid">
                {services.map((service, index) => (
                    <div
                        key={service.title}
                        className="service-item"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        style={{ borderColor: hoveredIndex === index ? service.color : "#ddd" }}
                    >
                        <div className="icon-wrapper" style={{ backgroundColor: hoveredIndex === index ? service.color : "#f0f0f0", color: hoveredIndex === index ? "white" : service.color }}>
                            {service.icon}
                        </div>
                        <div className="content">
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <style>
                {`
                    .container {
                        max-width: 1200px;
                        margin: 0 auto;
                        text-align: left;
                    }
                    .container h2{
                        font-size: 48px;
                        line-height: 56px;
                        font-weight: 700;
                        letter-spacing: -1.12px;
                        margin-bottom: 40px;
                    }
                    .title {
                        font-size: 32px;
                        font-weight: bold;
                        margin-bottom: 20px;
                    }
                    .service-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                        gap: 20px;
                    }
                    .service-item {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    }
                    .icon-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 8px;
                        margin-right: 15px;
                        transition: all 0.2s ease;
                    }
                    .content h3 {
                        margin: 0;
                        font-size: 19px;
                        font-weight: 400;
                        line-height: 26px;
                        letter-spacing: -0.2px;
                    }
                    .content p {
                        margin: 5px 0 0;
                        font-size: 14px;
                        color: #666;
                        font-weight: 400;
                        line-height: 24px;
                        letter-spacing: 0.16px;
                    }
                `}
            </style>
        </div>
    )
}
