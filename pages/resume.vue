<template>
    <div class="resume">
        <div class="resume-wrapper">
            <div class="left">
            <h2 data-scroll>{{resume.title}}</h2>
            <p>{{resume.subtext}}</p>
            </div>
        <div class="right">
            <div class="resume-section" data-scroll-section id="experiences">
                <h3>Experiences</h3>
            <div v-for='experience in resume.Experience' :key='experience.Company' class="resume-block">
                <h4 data-scroll data-scroll-speed="3">{{experience.Role}}</h4>
                <p data-scroll data-scroll-speed="2"><a :href="experience.companyWebsite" target="blank" class="hover-scale">{{experience.Company}}</a></p>
                <span data-scroll data-scroll-speed="1">{{$moment(experience.StartYear).format('YYYY')}} - {{experience.EndYear ? $moment(experience.EndYear).format('YYYY') : 'now'}}</span>
            </div>
            </div>
           <div class="resume-section" data-scroll-section>
                <h3>Instruction</h3>
            <div v-for='instruction in resume.Instruction' :key='instruction.Diploma' class="resume-block">
                <h4 data-scroll data-scroll-speed="3">{{instruction.Diploma}}</h4>
                <p data-scroll data-scroll-speed="2">{{instruction.SchoolName}}</p>
                <span data-scroll data-scroll-speed="1">{{$moment(instruction.StartYear).format('YYYY')}} - {{instruction.EndYear ? $moment(instruction.EndYear).format('YYYY') : 'now'}}</span>
            </div>
           </div>
           <div class="resume-section" data-scroll-section>
                <h3>Skills</h3>
            <div v-for='skill in resume.Skills' :key='skill.Domain' class="resume-block">
                <h4 data-scroll data-scroll-speed="2">{{skill.Domain}}</h4>
                <span data-scroll data-scroll-speed="1">{{skill.List}}</span>
            </div>
           </div>
        </div>
        
        </div>
    <div class="contact">
            <h2>Dîtes bonjour !</h2>
            <a class="hover-scale" :href="'mailto:'+settings.mail">{{settings.mail}}</a>
        </div>
        <div class="footer">
            <NuxtLink class="hover-scale" to='/legal'>Legal</NuxtLink>
        </div>
    </div>
</template>
<script>
export default {
async asyncData({$strapi}) {
    return{
        resume: await $strapi.find('resume'),
        settings: await $strapi.find('settings')
    }
}
}
</script>