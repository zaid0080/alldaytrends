// app/faq/page.tsx
import { Metadata } from 'next'
import { FaQuestionCircle } from 'react-icons/fa'

export const metadata: Metadata = {
    title: 'FAQ - AllDayTrends Twitter Trends Analysis',
    description: 'Frequently asked questions about AllDayTrends - your source for Twitter trending hashtags and topics worldwide.',
    keywords: [
        'Twitter trends FAQ',
        'trending hashtags questions',
        'alldaytrends help',
        'Twitter analytics FAQ',
        'trend analysis questions'
    ],
    twitter: {
        title: 'AllDayTrends FAQ - Twitter Trends Questions',
        description: 'Get answers to common questions about tracking Twitter trends with AllDayTrends.',
        card: 'summary',
        site: '@alldaytrends1'
    },
    openGraph: {
        title: 'FAQ - AllDayTrends Twitter Trends Analysis',
        description: 'Find answers to common questions about using AllDayTrends for Twitter trend analysis.',
        url: 'https://alldaytrends.in/faq',
        type: 'website',
    },
    alternates: {
        canonical: 'https://alldaytrends.in/faq',
    }
}

export default function FAQPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <FaQuestionCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-200">
                        Frequently Asked Questions
                    </h1>
                </div>

                <div className="space-y-8">
                    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
                            About AllDayTrends
                        </h2>
                        <p className="text-lg leading-relaxed mb-6">
                            A one-stop website to end your search for <span className="font-semibold text-indigo-600 dark:text-indigo-400">Top Twitter hashtags and trends</span>.
                            Find trends for over 400+ countries and cities. Know what is trending without even logging into Twitter.
                            Find hashtag analysis of your city, country or any other location all over the world.
                            Your popular hashtag search ends here.
                        </p>
                    </section>


                    <div className="space-y-8">
                        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-start gap-2">
                                <span className="text-indigo-600 dark:text-indigo-400">Q.</span>
                                Why AllDayTrends?
                            </h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                Since <span className="font-semibold">Twitter trends</span> are real-time, it's impossible to view most
                                tweeted topics a few hours ago on the Twitter website. An easy
                                solution to that is AllDayTrends. You will be able to find Twitter's
                                most popular hashtags that are trending currently as well as hours
                                ago. When you want a Twitter hashtag search, AllDayTrends helps you in
                                every possible way; from displaying the top 20 hashtags to where and
                                when those topics were seen.
                            </p>
                        </div>

                        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-start gap-2">
                                <span className="text-indigo-600 dark:text-indigo-400">Q.</span>
                                What is a Twitter trend?
                            </h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                Twitter is a social platform where people from all over the world like
                                to express their thoughts and opinions. Sometimes, these thoughts and
                                opinions (topics) gain rapid attention and popularity in certain
                                areas. For example, during popular events like the Olympic games,
                                Oscars, etc, people tweet their thoughts about them on Twitter. As
                                soon as a topic stops gaining attention from the people, it is no
                                longer considered as a trend on Twitter. Therefore, trends on Twitter
                                keep changing and since Twitter trends are real-time, it's not possible
                                to view topics that were trending a few hours ago on Twitter website.
                            </p>
                        </div>

                        <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-start gap-2">
                                <span className="text-indigo-600 dark:text-indigo-400">Q.</span>
                                Why can I not find data for my country or city at all?
                            </h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                We completely <span className="font-semibold">rely on Twitter</span> when retrieving and processing trends.
                                We try to collect the data for as many locations as practically
                                possible, but for some of them Twitter simply doesn't provide any
                                information.
                            </p>
                        </div>

                        <div className="pb-8">
                            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-start gap-2">
                                <span className="text-indigo-600 dark:text-indigo-400">Q.</span>
                                How do we determine the most tweeted hashtags?
                            </h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                We find out the <span className="font-semibold">highest tweet volume</span> with the data provided by Twitter
                                for every trend at all the times. It represents total number of tweets
                                worldwide. We find out the highest number of tweets that Twitter
                                provides for every trend every time we check. It represents total
                                number of tweets worldwide over previous 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}