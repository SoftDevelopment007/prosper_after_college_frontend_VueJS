<template>
    <div class="text">
        <div class="text__wrapper default-container">
            <h1>[Institution]</h1>
            <div>
                <div>
                [City], [State] [Zip]
                </div>
                <div>
                    <a href="[Url]">http://school.edu</a>
                </div>
            </div>
            <div>
                [Institution] is a [HIGHTDEG == 2 ? '2' : '4'] year [CONTROL == 1 ? 'Public' : CONTROL == 2 ? 'Private Non-profit' : 'Private For-profit'] college 
                offering up to the  [HIGHDEG == 2 ? 'Associate' : (HIGHDEG == 3 ? 'Bachelors' : 'Graduate') ] degree. <br />
                Its admission rate is [ADM_RATE_ALL]%, so [(int)(ADM_RATE_ALL * 100)] applicants out of 100 are accepted each year.<br />
            </div>
            
            <div class="table">
                <h3>Cost</h3>
                <strong>Average cost of attendance</strong>, includes tuition, fees, books, supplies and living expenses: [Cost]<br />
                <strong>In-state tuition</strong> (excluding supplies and living expenses): [IN_State_Tuition]<br />
                <strong>Out-of-state tuition</strong> (excluding supplies and living expenses): [OUT_of_state_tuition]<br />
                <h3>Average net cost</h3>
                <table>
                    <tr>
                        <th>Household income</th>
                        <th>Average net price (cost minus grants and scholarships)</th>
                    </tr>
                    <tr>
                        <td>
                            <strong>Average</strong></td>
                            <td>[Control == 1 ? AvgInStateTuition : AvgPrivateTuition]</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>$0-$30,000</strong></td>
                        <td>[Control == 1 ? AvgInStateTuition1 : AvgPrivateTuition1]</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>$30,001-$48,000</strong></td>
                        <td>[Control == 1 ? AvgInStateTuition2 : AvgPrivateTuition2]</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>$48,001-$75,000</strong></td>
                        <td>[Control == 1 ? AvgInStateTuition3 : AvgPrivateTuition3]</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>$75,001-$110,000</strong></td>
                        <td>[Control == 1 ? AvgInStateTuition4 : AvgPrivateTuition4]</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>$110,001+</strong></td>
                        <td>[Control == 1 ? AvgInStateTuition5 : AvgPrivateTuition5]</td>
                    </tr>
                </table>
                <h3>This school occupies the [CostPercentileState]th percentile by cost among other [HIGHDEG == 2 ? '2' : '4'] year universities in [STATE].</h3> This means that [CostPercentileState]% of schools are less expensive then this one.<br />
                <h3>This school occupies the [CostPercentileStateControl]th percentile by cost among other [HIGHDEG == 2 ? '2' : '4'] year universities in [STATE].</h3><br />
                <h3>This school occupies the [CostPercentileNational]th percentile by cost among other [HIGHDEG == 2 ? '2' : '4'] private universities nationally.</h3><br />
            </div>
            <div>
                <h3>Financial Aid</h3>
                <div>
                    <strong>Percent of undergraduate students receiving federal loans:</strong>[PCTFLOAN]
                </div>
                <div>
                    <strong>Percent of students receiving Pell grants:</strong>[PCTPELL]
                </div>
                <div>
                    <strong>Median federal student loan debt (excludes private loans):</strong>[DEBT_MDN]
                </div>
            </div>
            <div>
                <h3>Return On Investment (ROI)</h3>
                Since education is a form of investment into your future it is important to consider what you gain for every dollar you spend. 
                Depending on the major, graduates of some schools earn on average more then graduates of other schools. 
                But the reasons for this are not as straightforward as just the status of a given university. Consider that more competetive schools attract more 
                ambitious and hard working students. While some other schools have predominately middle-upper class students whose parents will help them navigate 
                the job market.  Therefor neither a school with a high earning average an assurance of your future success, neither a school with a lower earning average
                a limitation on your future earning potential.  Much of your success will depend on your hard work, communication skills and ability to adapt.
                <div>
                    <h4>We calculated that this school has on average an ROI of <strong>[averageroi]%</strong></h4> 
                    How this number was calculated: we took all private and public 4 year colleges and universities that report earnings for their graduates
                        and compared the average cost of attending that school for 4 years with the earning potential of the graduates over 10 years after graduation,
                        taking into consideration a 5% per year salary increase. Then we averaged the ROI for all reported majors for this school.<br />
                    <h5>To get the ROI for a specific major please select a major from this dropdown</h5>
                    <select>
                        <option>[GET LIST OF MAJORS FROM API ON LOAD]</option>
                    </select>
                    <span>(*** should appear inline with selection)<strong>[The value will come from the api, but it should not be displayed in the dropdown, and instead should appear here On-Select-event]</strong></span>
                        
                </div>
            </div>
            <div>
                <h3>Student Body - undergraduate</h3>
                <div>
                    <strong>Student body:</strong>[UDGS]
                </div>
                <div>
                    <strong>Men:</strong>[UDGS_MEN]
                </div>
                <div>
                    <strong>Women:</strong>[UDGS_WOMEN]
                </div>
                <div>
                    <strong>White:</strong>[UDGS_WHITE]
                </div>
                <div>
                    <strong>Black:</strong>[UDGS_BLACK]
                </div>
                <div>
                    <strong>Hispanic:</strong>[UGDS_HISP]
                </div>
                <div>
                    <strong>Asian:</strong>[UGDS_ASIAN]
                </div>
                <div>
                    <strong>American Indian:</strong>[UGDS_AIAN]
                </div>
                <div>
                    <strong>Native Hawaiian/Pacific Islander:</strong>[UGDS_NHPI]
                </div>

                <h4>Student body by income</h4>
                <div>
                    <strong>$0-$30,000:</strong>[INC_PCT_LO]
                </div>
                <div>
                    <strong>$30,001-$48,000:</strong>[INC_PCT_M1]
                </div>
                <div>
                    <strong>$48,001-$75,000:</strong>[INC_PCT_M2]
                </div>
                <div>
                    <strong>$75,001-$110,000:</strong>[INC_PCT_H1]
                </div>
                <div>
                    <strong>$110,001+:</strong>[INC_PCT_H2]
                </div>
            </div>
            
            <div class="table">
                <h3>Test Scores</h3>
                <div>Below are the test scores as reported for most students. The 75th percentile is the score corresponding to the 75th percentile of students (most students had at least this score).
                    The 25th percentile represents the lower test score that the least students (25%) have received. Thus it is better if your score is above the 75% mark, but a lower score (even below 25%) should not discourage you from applying.
                </div>
                <table>
                    <tr>
                        <th></th>
                        <th>SAT Math</th>
                        <th>SAT Reading</th>
                        <th>ACT Math</th>
                        <th>ACT English</th>
                        <th>ACT Composite</th>
                    </tr>
                    <tr>
                        <td><strong>75% (Most student's scores)</strong></td>
                        <td>[SATM75]</td>
                        <td>[SATR75]</td>
                        <td>[ACTMT75]</td>
                        <td>[ACTEN75]</td>
                        <td>[ACTCM75]</td>
                    </tr>
                    <tr>
                        <td><strong>25% (Least student's scores)</strong></td>
                        <td>[SATM25]</td>
                        <td>[SATR25]</td>
                        <td>[ACTMT25]</td>
                        <td>[ACTEN25]</td>
                        <td>[ACTCM25]</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>